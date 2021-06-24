const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const natsWrapper = require("./nats-wrapper");
const {
  userCreated,
  portfolioCreated,
  Listener,
} = require("@jafajardo-portfolio/common");
const User = require("./models/user");
const Portfolio = require("./models/portfolio");
const retrieveRoute = require("./routes/retrieve");
const createRoute = require("./routes/create");
const deleteRoute = require("./routes/delete");
const updateRoute = require("./routes/update");

const app = express();

// Middleware
app.use(json());
app.use(cors());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

// Routes
app.use(retrieveRoute);
app.use(createRoute);
app.use(deleteRoute);
app.use(updateRoute);

const processPortfolioCreatedMessage = async (msg, rawData) => {
  try {
    console.log("Trade service: callback received message - user created", msg);

    let portfolio = await Portfolio.findById(msg.id);
    if (!portfolio) {
      portfolio = Portfolio.build({
        id: msg.id,
        name: msg.name,
        isDefault: msg.isDefault,
        isActive: msg.isActive,
        user: { id: msg.user.id, email: msg.user.email },
      });
      await portfolio.save();
    }
    rawData.ack();
  } catch (err) {
    console.log("Trade service: error while processing callback message", err);
  }
};

const processUserCreatedMessage = async (msg, rawData) => {
  try {
    console.log("Trade service: callback received message - user created", msg);

    let user = await User.findById(msg.id);

    if (!user) {
      user = User.build(msg.id, msg.email);
      await user.save();
    }

    rawData.ack();
  } catch (err) {
    console.log("Trade service: error while processing callback message", err);
  }
};

const startListeners = () => {
  return new Promise((resolve, reject) => {
    try {
      new Listener(natsWrapper.client, userCreated).listen(
        processUserCreatedMessage
      );
      new Listener(natsWrapper.client, portfolioCreated).listen(
        processPortfolioCreatedMessage
      );
      resolve;
    } catch (err) {
      console.log("Retry connecting to NATS server");
      reject;
    }
  });
};

const connectNats = () => {
  return new Promise((resolve, reject) => {
    const clusterId = process.env.NATS_CLUSTER_ID;
    const clientId =
      process.env.NATS_CLIENT_ID || randomBytes(8).toString("hex");

    natsWrapper
      .connect(
        clusterId,
        clientId,
        `http://${process.env.NATS_URI}:${process.env.NATS_PORT}`
      )
      .then(resolve)
      .catch(reject);
  });
};

const wait = (delay) => {
  return new Promise((r) => setTimeout(r, delay));
};

const retryOperation = (operation, delay, retries) => {
  return new Promise((resolve, reject) => {
    return operation()
      .then(resolve)
      .catch((reason) => {
        if (retries > 0) {
          return wait(delay)
            .then(retryOperation.bind(null, operation, delay, retries - 1))
            .then(resolve)
            .catch(reject);
        }
        return reject(reason);
      });
  });
};

const start = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to Mongodb...");
  } catch (err) {
    console.log("Error connecting to Mongodb:", err);
  }

  try {
    retryOperation(connectNats, 1000, 5);
  } catch (err) {
    console.log("Error connecting to NATS server", err);
  }

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
};

start();
retryOperation(startListeners, 1000, 5);

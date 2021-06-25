const express = require("express");
const { json } = require("body-parser");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const cors = require("cors");
const { natsWrapper } = require("./nats-wrapper");
const { randomBytes } = require("crypto");

const PORT = process.env.PORT || 5000;

const app = express();
app.set("trust proxy", true);

// Middleware
app.use(json());
app.use(cors());
app.use(
  cookieSession({
    secure: false,
    signed: false,
  })
);

// Routes
const { signup } = require("./routes/signup");
const { signin } = require("./routes/signin");
const { signout } = require("./routes/signout");
const { currentUser } = require("./routes/current-user");

app.use(signup);
app.use(signin);
app.use(signout);
app.use(currentUser);

const connectNats = () => {
  return new Promise((resolve, reject) => {
    const clusterId = process.env.NATS_CLUSTER_ID;
    const clientId =
      process.env.NATS_CLIENT_ID || randomBytes(8).toString("hex");

    return natsWrapper
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
  return new Promise((resolve) => setTimeout(resolve, delay));
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

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongodb...");
  } catch (err) {
    console.log("Error connecting to Mongodb:", err);
  }

  try {
    await retryOperation(connectNats, 1000, 5);
  } catch (err) {
    console.log("Error connecting to NATS server", err);
  }

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
  });
};

start();

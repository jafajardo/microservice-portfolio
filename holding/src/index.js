const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const { json } = require('body-parser');
const { randomBytes } = require('crypto');
const mongoose = require('mongoose');
const natsWrapper = require('./nats-wrapper');
const {
  Listener,
  portfolioCreated,
  tradeCreated,
} = require('@jafajardo-portfolio/common');
const Portfolio = require('./models/portfolio');
const Holding = require('./models/holding');
const User = require('./models/user');
const retrieve = require('./routes/retrieve');
const create = require('./routes/create');
const update = require('./routes/update');
const deleteRoute = require('./routes/delete');

const app = express();
const PORT = process.env.PORT || 7000;

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
app.use(retrieve);
app.use(create);
app.use(update);
app.use(deleteRoute);

const portfolioCreatedCallback = async (msg, rawData) => {
  console.log('Received message', msg);

  try {
    const { id: userId, email } = msg.user;
    let user = await User.findById(userId);
    if (!user) {
      user = User.build(userId, email);
      await user.save();
    }

    let portfolio = await Portfolio.findById(msg.id);
    if (!portfolio) {
      portfolio = Portfolio.build({
        id: msg.id,
        name: msg.name,
        isDefault: msg.isDefault,
        isActive: msg.isActive,
        user,
      });
      await portfolio.save();
    }
    rawData.ack();
  } catch (err) {
    console.log('Holding service: Error creating new portfolio', err);
  }
};

const tradeCreatedCallback = async (msg, rawData) => {
  console.log('Received message - trade created', msg);

  try {
    const { portfolioId, symbol } = msg;
    const portfolio = await Portfolio.findById(portfolioId);
    console.log('Portfolio', portfolio);
    if (portfolio) {
      // TODO: Figure out how to fill up "name" parameter properly
      const holding = Holding.build({
        name: symbol,
        symbol,
        portfolio: portfolio._id,
      });
      await holding.save();
    } else {
      console.log('Holding service: Portfolio not found');
    }
  } catch (err) {
    console.log('Holding service: Error creating new holding', err);
  }
};

const startListener = () => {
  new Listener(natsWrapper.client, portfolioCreated).listen(
    portfolioCreatedCallback
  );
  new Listener(natsWrapper.client, tradeCreated).listen(tradeCreatedCallback);
};

const start = async () => {
  try {
    const clusterId = process.env.NATS_CLUSTER_ID;
    const clientId =
      process.env.NATS_CLIENT_ID || randomBytes(8).toString('hex');
    await natsWrapper.connect(
      clusterId,
      clientId,
      `http://${process.env.NATS_URI}:${process.env.NATS_PORT}`
    );
  } catch (err) {
    console.log('NatsWrapper initialisation failed', err);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to Mongodb');
  } catch (err) {
    console.log('Error connecting to Mongodb', err);
  }
  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
};

start();
startListener();

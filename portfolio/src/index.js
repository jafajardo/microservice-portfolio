const express = require('express');
const { json } = require('body-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const { randomBytes } = require('crypto');
const mongoose = require('mongoose');
const {
  Listener,
  Publisher,
  userCreated,
  portfolioCreated,
} = require('@jafajardo-portfolio/common');
const natsWrapper = require('./nats-wrapper');
const { createPortfolio } = require('./services');
const create = require('./routes/create');
const retrieve = require('./routes/retrieve');
const update = require('./routes/update');
const deletePortfolio = require('./routes/delete');

const app = express();

// Middlewares
app.use(json());
app.use(cors());
app.use(
  cookieSession({
    secure: false,
    signed: false,
  })
);

// Routes
app.use(create);
app.use(retrieve);
app.use(update);
app.use(deletePortfolio);

const cb = async (msg, rawData) => {
  console.log('Callback received message', msg);
  console.log('Creating default portfolio for new user...');

  const portfolio = await createPortfolio(msg.id, msg.email);
  if (portfolio) {
    console.log('Successfully created new portfolio...');

    // Publish creation of new portfolio
    new Publisher(natsWrapper.client, portfolioCreated).publish({
      id: portfolio.id,
      name: portfolio.name,
      isDefault: portfolio.isDefault,
      isActive: portfolio.isActive,
      user: { id: portfolio.user._id, email: portfolio.user.email },
    });
  } else {
    console.log(`Creation of new portfolio for user ${msg.id} failed`);
  }

  rawData.ack();
};

const startListener = () => {
  new Listener(natsWrapper.client, userCreated).listen(cb);
};

const clusterId = process.env.NATS_CLUSTER_ID;
const clientId = process.env.NATS_CLIENT_ID || randomBytes(8).toString('hex');
const start = async () => {
  try {
    await natsWrapper.connect(
      clusterId,
      clientId,
      `http://${process.env.NATS_URI}:${process.env.NATS_PORT}`
    );
  } catch (err) {
    console.log('Error connecting to NATS server', err);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to Mongodb!');
  } catch (err) {
    console.log('Error connecting to Mongodb:', err);
  }

  const PORT = process.env.PORT || 6000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
};

start();
startListener();

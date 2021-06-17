const Publisher = require('./src/nats/publisher');
const Listener = require('./src/nats/listener');
const { encodeJWT, decodeJWT } = require('./src/services');
const currentUser = require('./src/middlewares/current-user');
const requireAuth = require('./src/middlewares/require-auth');
const validateRequest = require('./src/middlewares/validate-request');
const {
  userCreated,
  portfolioCreated,
  tradeCreated,
} = require('./src/nats/events');
const TradeTypes = require('./src/enums/tradeTypes');

module.exports = {
  Publisher,
  Listener,
  encodeJWT,
  decodeJWT,
  currentUser,
  validateRequest,
  requireAuth,
  userCreated,
  portfolioCreated,
  TradeTypes,
};

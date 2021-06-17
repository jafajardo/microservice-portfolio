const express = require('express');
const { body } = require('express-validator');
const moment = require('moment');
const {
  currentUser,
  requireAuth,
  validateRequest,
  Publisher,
  tradeCreated,
} = require('@jafajardo-portfolio/common');
const natsWrapper = require('../nats-wrapper');
const Trade = require('../models/trade');
const Portfolio = require('../models/portfolio');

const router = express.Router();

router.post(
  '/api/trades',
  currentUser,
  requireAuth,
  [
    body('portfolioId')
      .not()
      .isEmpty()
      .withMessage('Trade/share portfolio id is required'),
    body('symbol')
      .not()
      .isEmpty()
      .withMessage('Trade/Share symbol is required'),
    body('date').not().isEmpty().withMessage('Trade/Share date is required'),
    body('tradeType')
      .not()
      .isEmpty()
      .withMessage('Trade/Share trade type is required'),
    body('quantity')
      .not()
      .isEmpty()
      .withMessage('Trade/Share quantity is required'),
    body('sharePrice')
      .not()
      .isEmpty()
      .withMessage('Trade/Share price is required'),
    body('brokerage')
      .not()
      .isEmpty()
      .withMessage('Trade/Share brokerage is required'),
    body('currency')
      .not()
      .isEmpty()
      .withMessage('Trade/Share currency is required'),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const {
        portfolioId,
        symbol,
        date,
        tradeType,
        quantity,
        sharePrice,
        brokerage,
        currency,
      } = req.body;

      const portfolio = await Portfolio.findById(portfolioId).populate('user');

      if (portfolio && portfolio.user?._id.toString() === req.currentUser.id) {
        const formattedDate = moment(date, 'YYYY-MM-DD');
        const trade = Trade.build({
          symbol,
          date: formattedDate.format(),
          tradeType,
          quantity,
          sharePrice,
          brokerage,
          currency,
          portfolio,
        });
        await trade.save();

        new Publisher(natsWrapper.client, tradeCreated).publish({
          portfolioId,
          symbol: trade.symbol,
        });

        return res.status(201).send(trade);
      } else {
        return res.status(400).send({ msg: 'Invalid portfolio id' });
      }
    } catch (err) {
      console.log('Saving trade to DB failed', err);
      return req.status(400).send({ msg: 'Saving trade to DB failed' });
    }
  }
);

module.exports = router;

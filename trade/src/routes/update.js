const express = require('express');
const { body } = require('express-validator');
const moment = require('moment');
const {
  currentUser,
  requireAuth,
  validateRequest,
} = require('@jafajardo-portfolio/common');
const Trade = require('../models/trade');

const router = express.Router();

router.put(
  '/api/trades/:tradeId',
  currentUser,
  requireAuth,
  [
    body('portfolioId')
      .not()
      .isEmpty()
      .withMessage('Portfolio id parameter is required'),
    body('date').not().isEmpty().withMessage('Date parameter is required'),
    body('quantity')
      .not()
      .isEmpty()
      .withMessage('Quantity parameter is required'),
    body('sharePrice')
      .not()
      .isEmpty()
      .withMessage('Share price parameter is required'),
    body('brokerage')
      .not()
      .isEmpty()
      .withMessage('Brokerage parameter is required'),
  ],
  validateRequest,
  async (req, res) => {
    const { tradeId } = req.params;
    const { portfolioId, date, quantity, sharePrice, brokerage } = req.body;

    try {
      const trade = await Trade.findById(tradeId).populate('portfolio');
      const formattedDate = moment(date, 'YYYY-MM-DD');
      if (
        trade &&
        trade.portfolio._id.toString() === portfolioId &&
        trade.portfolio.user.toString() == req.currentUser.id
      ) {
        trade.set({
          formattedDate,
          quantity,
          sharePrice,
          brokerage,
        });
        await trade.save();
        return res.status(200).send(trade);
      } else {
        console.log('Trade update failed');
        return res.status(400).send({ msg: 'Trade update failed' });
      }
    } catch (err) {
      console.log('Trade update failed', err);
      return res.status(400).send({ msg: 'Trade update failed' });
    }
  }
);

module.exports = router;

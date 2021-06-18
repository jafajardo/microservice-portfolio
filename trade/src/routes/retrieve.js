const express = require('express');
const { query } = require('express-validator');
const mongoose = require('mongoose');
const {
  currentUser,
  requireAuth,
  validateRequest,
} = require('@jafajardo-portfolio/common');
const Trade = require('../models/trade');
const Portfolio = require('../models/portfolio');

const router = express.Router();

router.get(
  '/api/trades',
  currentUser,
  requireAuth,
  [
    query('symbol')
      .not()
      .isEmpty()
      .withMessage('Trade/Share symbol is required'),
    query('portfolioId')
      .not()
      .isEmpty()
      .withMessage('Trade/Share portfolio id is required'),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { symbol, portfolioId } = req.query;
      const portfolio = await Portfolio.findById(portfolioId);
      if (portfolio) {
        const trades = await Trade.find({ symbol, portfolio });

        if (trades.length > 0) {
          return res.status(200).send({ [symbol]: trades });
        } else {
          return res.status(200).send({ msg: 'No trades found' });
        }
      } else {
        return res.status(400).send({ msg: 'Portfolio not found' });
      }
    } catch (err) {
      console.log('Error retrieving a trade', err);
      res.status(400).send({ msg: 'Error retrieving trade' });
    }
  }
);

module.exports = router;

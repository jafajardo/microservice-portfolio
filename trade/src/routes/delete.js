const express = require('express');
const { body } = require('express-validator');
const {
  currentUser,
  requireAuth,
  validateRequest,
} = require('@jafajardo-portfolio/common');
const Trade = require('../models/trade');

const router = express.Router();

router.delete(
  '/api/trades/:tradeId',
  currentUser,
  requireAuth,
  [
    body('portfolioId')
      .not()
      .isEmpty()
      .withMessage('Portfolio id parameter is required'),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { tradeId } = req.params;
      const { portfolioId } = req.body;
      const trade = await Trade.findById(tradeId).populate('portfolio');

      if (
        trade &&
        trade.portfolio._id.toString() === portfolioId &&
        trade.portfolio.user.toString() === req.currentUser.id
      ) {
        await Trade.deleteOne({ _id: trade._id });
        return res.status(200).send({ msg: 'Trade deleted' });
      } else {
        return res.status(400).send({ msg: 'Trade not found, delete failed' });
      }
    } catch (err) {
      console.log('Trade delete failed', err);
      return res.status(400).send({ msg: 'Trade delete failed' });
    }
  }
);

module.exports = router;

const express = require('express');
const { body } = require('express-validator');
const {
  currentUser,
  requireAuth,
  validateRequest,
} = require('@jafajardo-portfolio/common');
const Portfolio = require('../models/portfolio');
const Holding = require('../models/holding');

const router = express.Router();

router.post(
  '/api/holdings',
  currentUser,
  requireAuth,
  [
    body('name')
      .not()
      .isEmpty()
      .withMessage('Name attribute of Holding is required'),
    body('symbol')
      .not()
      .isEmpty()
      .withMessage('Symbol attribute of Holding is required'),
  ],
  validateRequest,
  async (req, res) => {
    const { name, symbol } = req.body;
    const { portfolioId } = req.query;

    try {
      const portfolio = await Portfolio.findById(portfolioId);
      if (!portfolio) {
        console.log(`Portfolio with id ${portfolioId} not found`);
        return res
          .status(400)
          .send({ msg: `Portfolio with id ${portfolioId} not found` });
      }

      const holding = Holding.build({
        name,
        symbol,
        portfolio,
      });
      await holding.save();

      res.status(201).send(holding);
    } catch (err) {
      console.log('Error saving holding', err);
      res.status(400).send({ msg: 'Error saving holding' });
    }
  }
);

module.exports = router;

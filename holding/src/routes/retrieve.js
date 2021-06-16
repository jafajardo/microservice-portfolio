const express = require('express');
const { body } = require('express-validator');
const {
  currentUser,
  requireAuth,
  validateRequest,
} = require('@jafajardo-portfolio/common');
const Holding = require('../models/holding');
const Portfolio = require('../models/portfolio');

const router = express.Router();

router.get('/api/holdings', currentUser, requireAuth, async (req, res) => {
  const { portfolioId } = req.query;

  try {
    const existingPortfolio = await Portfolio.findById(portfolioId);
    if (!existingPortfolio) {
      console.log(`Portfolio not found with portfolio id: ${portfolioId}`);
      return res.status(400).send({
        msg: `Portfolio not found with portfolio id: ${portfolioId}`,
      });
    }

    const holdings = await Holding.find({
      portfolio: existingPortfolio._id,
    });
    if (!holdings.length > 0) {
      console.log('No holdings found');
      return res.status(200).send({ msg: 'No holdings found' });
    }

    return res.status(200).send(holdings);
  } catch (err) {
    console.log(`Error retrieving holdings for portfolio ${portfolioId}`, err);
    res.status(400).send({
      msg: `Error retrieving holdings for portfolio ${portfolioId}`,
    });
  }
});

router.get(
  '/api/holdings/:holdingId',
  currentUser,
  requireAuth,
  async (req, res) => {
    const { holdingId } = req.params;

    try {
      const holding = await Holding.findById(holdingId);
      if (!holding) {
        console.log(`Holding with id ${holdingId} not found`);
        return res
          .status(400)
          .send({ msg: `Holding with id ${holdingId} not found` });
      }
      return res.status(200).send(holding);
    } catch (err) {
      console.log('Error retrieving a holding', err);
    }
  }
);

module.exports = router;

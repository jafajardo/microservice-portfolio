const express = require('express');
const { requireAuth, currentUser } = require('@jafajardo-portfolio/common');
const Portfolio = require('../models/portfolio');

const router = express.Router();

router.get('/api/portfolios', requireAuth, async (req, res) => {
  try {
    const { id } = req.currentUser;

    const portfolios = await Portfolio.find({ user: id });

    if (!portfolios.length > 0) {
      console.log('Portfolio not found');
      return res.status(400).send({ msg: 'No portfolio for user found' });
    }

    return res.status(200).send(portfolios);
  } catch (err) {
    return res.status(400).send({ msg: 'Error retrieving portfolio' });
  }
});

router.get(
  '/api/portfolios/:portfolioId',
  currentUser,
  requireAuth,
  async (req, res) => {
    try {
      const { portfolioId } = req.params;
      const portfolio = await Portfolio.findById(portfolioId);
      if (portfolio) {
        return res.status(200).send(portfolio);
      } else {
        return res.status(400).send({ msg: 'Portfolio not found' });
      }
    } catch (err) {
      return res.status(400).send({ msg: 'Error retrieving portfolio' });
    }
  }
);

module.exports = router;

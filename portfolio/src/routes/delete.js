const express = require('express');
const Portfolio = require('../models/portfolio');

const router = express.Router();

router.delete('/api/portfolios/:portfolioId', async (req, res) => {
  const { portfolioId } = req.params;

  const portfolio = await Portfolio.findById(portfolioId);
  if (!portfolio) {
    console.log(`Portfolio with id ${portfolioId} not found`);
    res.status(400).send({ msg: `Portfolio with id ${portfolioId} not found` });
  }

  portfolio.set({ isActive: false });
  await portfolio.save();

  res.status(200).send(portfolio);
});

module.exports = router;

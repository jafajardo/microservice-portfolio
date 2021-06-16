const express = require('express');
const { requireAuth, currentUser } = require('@jafajardo-portfolio/common');
const Portfolio = require('../models/portfolio');

const router = express.Router();

router.get('/api/portfolios', currentUser, requireAuth, async (req, res) => {
  console.log(req.body);

  const { id, email } = req.currentUser;

  const portfolios = await Portfolio.find({ user: id });

  if (!portfolios.length > 0) {
    console.log('Portfolio not found');
    res.status(400).send({ msg: 'No portfolio for user found' });
  }

  res.status(200).send(portfolios);
});

module.exports = router;

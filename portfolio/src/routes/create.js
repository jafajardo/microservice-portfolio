const express = require('express');
const {
  currentUser,
  requireAuth,
  Publisher,
  portfolioCreated,
} = require('@jafajardo-portfolio/common');
const { createPortfolioForExistingUser } = require('../services');
const natsWrapper = require('../nats-wrapper');

const router = express.Router();

router.post('/api/portfolios', requireAuth, async (req, res) => {
  console.log(req.currentUser);

  const { id } = req.currentUser;

  const newPortfolio = await createPortfolioForExistingUser(id);

  // Portfolio: { _id, name, isDefault, isActive, user: {_id, email} }
  new Publisher(natsWrapper.client, portfolioCreated).publish({
    id: newPortfolio.id,
    name: newPortfolio.name,
    isDefault: newPortfolio.isDefault,
    isActive: newPortfolio.isActive,
    user: newPortfolio.user,
  });

  res.status(201).send(newPortfolio);
});

module.exports = router;

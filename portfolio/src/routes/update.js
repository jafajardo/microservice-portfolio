const express = require('express');
const { body } = require('express-validator');
const {
  currentUser,
  requireAuth,
  validateRequest,
} = require('@jafajardo-portfolio/common');
const Portfolio = require('../models/portfolio');

const router = express.Router();

router.put(
  '/api/portfolios/:portfolioId',
  requireAuth,
  [
    body('name').not().isEmpty().withMessage('Portfolio name is required'),
    body('isDefault')
      .not()
      .isEmpty()
      .withMessage('IsDefault property is required'),
  ],
  validateRequest,
  async (req, res) => {
    console.log(req.body);

    const { portfolioId } = req.params;
    const { name, isDefault } = req.body;

    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      console.log(`Portfolio with id ${portfolioId} not found`);
      res
        .status(400)
        .send({ msg: `Portfolio with id ${portfolioId} not found` });
    }

    portfolio.set({
      name,
      isDefault,
    });
    await portfolio.save();

    res.status(200).send(portfolio);
  }
);

module.exports = router;

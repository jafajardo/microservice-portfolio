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

router.put(
  '/api/holdings/:holdingId',
  currentUser,
  requireAuth,
  [
    body('name')
      .not()
      .isEmpty()
      .withMessage('Name attribute of holding is required'),
    body('symbol')
      .not()
      .isEmpty()
      .withMessage('Symbol attribute of holding is required'),
  ],
  validateRequest,
  async (req, res) => {
    const { name, symbol } = req.body;
    const { holdingId } = req.params;
    const { id: userId } = req.currentUser;

    try {
      const existingHolding = await Holding.findById(holdingId);
      if (!existingHolding) {
        console.log(`Holding with id ${holdingId} not found`);
        return res
          .status(400)
          .send({ msg: `Holding with id ${holdingId} not found` });
      }

      const portfolios = await Portfolio.find({ user: userId });
      if (!portfolios.length > 0) {
        console.log('No portfolios for the current user found!');
        return res
          .status(400)
          .send({ msg: 'No portfolios for the current user found!' });
      }

      if (
        portfolios.find(
          (p) => p._id.toString() === existingHolding.portfolio.toString()
        )
      ) {
        console.log('Existing holding and portfolio ids match');
        existingHolding.set({
          name,
          symbol,
        });
        await existingHolding.save();
        return res.status(204).send(existingHolding);
      }
    } catch (err) {
      console.log('Error updating holding', err);
      res.send(400).send({ msg: 'Error updating holding' });
    }
  }
);

module.exports = router;

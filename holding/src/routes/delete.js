const express = require('express');
const { currentUser, requireAuth } = require('@jafajardo-portfolio/common');
const Holding = require('../models/holding');
const User = require('../models/user');
const Portfolio = require('../models/portfolio');

const router = express.Router();

router.delete(
  '/api/holdings/:holdingId',
  currentUser,
  requireAuth,
  async (req, res) => {
    const { holdingId } = req.params;
    const { id: userId } = req.currentUser;

    try {
      const existingHolding = await Holding.findById(holdingId);
      if (!existingHolding) {
        console.log('Holding not found');
        return res.status(400).send({ msg: 'Holding not found' });
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
        console.log('User id matches');
        await Holding.deleteOne({ _id: existingHolding._id });
        return res.status(200).send({ msg: 'Holding deleted' });
      } else {
        console.log('Current user does not match the user of the holding');
        res
          .status(400)
          .send({ msg: 'Current user does not match the user of the holding' });
      }
    } catch (err) {
      console.log('Error deleting holding', err);
      res.status(400).send({ msg: 'Error deleting holding' });
    }
  }
);

module.exports = router;

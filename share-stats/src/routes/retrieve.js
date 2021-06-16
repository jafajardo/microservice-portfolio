const express = require('express');
const axios = require('axios');
const { currentUser, requireAuth } = require('@jafajardo-portfolio/common');

const router = express.Router();

router.get(
  '/api/sharestats/:symbol',
  currentUser,
  requireAuth,
  async (req, res) => {
    const { symbol } = req.params;
    try {
      const response = await axios.get(
        `https://asx.api.markitdigital.com/asx-research/1.0/companies/${symbol}/key-statistics`
      );

      return res.status(200).send(response.data.data);
    } catch (err) {
      res
        .status(400)
        .send({ msg: `No share stats returned for symbol ${symbol}. ${err}` });
    }
  }
);

module.exports = router;

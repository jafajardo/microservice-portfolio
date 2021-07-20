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
      let data = {};
      let response = await axios.get(
        `https://asx.api.markitdigital.com/asx-research/1.0/companies/${symbol}/key-statistics`
      );

      data = { symbol: `${symbol.toUpperCase()}.AX`, ...response.data.data };

      response = await axios.get(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol.toUpperCase()}.AX?interval=1d&range=400d`
      );

      if (response.data) {
        data = {
          ...data,
          timestamp: response.data.chart.result[0].timestamp,
          ...response.data.chart.result[0].indicators.quote[0],
        };
      }

      return res.status(200).send(data);
    } catch (err) {
      res
        .status(400)
        .send({ msg: `No share stats returned for symbol ${symbol}. ${err}` });
    }
  }
);

module.exports = router;

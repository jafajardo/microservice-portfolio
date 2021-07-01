const express = require('express');
const { currentUser } = require('@jafajardo-portfolio/common');

const router = express.Router();

router.get('/api/users/currentuser', currentUser, async (req, res) => {
  return res.status(200).send({ currentUser: req.currentUser || null });
});

module.exports = router;

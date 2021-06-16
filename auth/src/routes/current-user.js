const express = require('express');
const { currentUser } = require('@jafajardo-portfolio/common');

const router = express.Router();

router.get('/api/users/currentuser', currentUser, async (req, res) => {
  res.status(200).send({ currentUser: req.currentUser || null });
});

exports.currentUser = router;

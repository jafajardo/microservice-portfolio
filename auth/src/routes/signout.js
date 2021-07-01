const express = require('express');

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  req.session = null;
  req.currentUser = null;
  res.status(200).send({ msg: 'Successfully signed out' });
});

module.exports = router;

const express = require('express');
const User = require('../models/user');
const { encodeJWT } = require('@jafajardo-portfolio/common');

const router = express.Router();

router.post('/api/users/signin', async (req, res) => {
  if (process.env.NODE_ENV === 'DEV') {
    console.log(req.body);
  }

  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(400).send({ msg: 'Invalid email or password' });
  }

  req.session.jwt = {
    jwt: encodeJWT(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET
    ),
  };

  res.status(200).send(existingUser);
});

exports.signin = router;

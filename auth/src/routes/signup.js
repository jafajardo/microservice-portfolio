const express = require('express');
const { body } = require('express-validator');
const {
  validateRequest,
  encodeJWT,
  Publisher,
  userCreated,
} = require('@jafajardo-portfolio/common');
const User = require('../models/user');
const { natsWrapper } = require('../nats-wrapper');

const router = express.Router();

router.post(
  '/api/users/signup',
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage('Valid password is required'),
  validateRequest,
  async (req, res) => {
    if (process.env.NODE_ENV === 'DEV') {
      console.log(req.body);
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).send({ msg: 'Email in use.' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    req.session.jwt = {
      jwt: encodeJWT(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET
      ),
    };

    new Publisher(natsWrapper.client, userCreated).publish({
      id: newUser.id,
      email: newUser.email,
    });

    res.status(201).send(newUser);
  }
);

exports.signup = router;

const jsonwebtoken = require('jsonwebtoken');

const encodeJWT = (payload, secret) => {
  return jsonwebtoken.sign(payload, secret);
};

const decodeJWT = (token, secret) => {
  return jsonwebtoken.verify(token, secret);
};

module.exports = { encodeJWT, decodeJWT };

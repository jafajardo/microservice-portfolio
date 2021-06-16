const jsonwebtoken = require('jsonwebtoken');

const encodeJWT = (payload, secret) => {
  return jsonwebtoken.sign(payload, secret);
};

exports.encodeJWT = encodeJWT;

const decodeJWT = (token, secret) => {
  return jsonwebtoken.verify(token, secret);
};

exports.decodeJWT = decodeJWT;

const { decodeJWT } = require('@jafajardo-portfolio/common');

const currentUser = (req, res, next) => {
  if (req.session.jwt) {
    const { jwt } = req.session.jwt;
    req.currentUser = decodeJWT(jwt, process.env.JWT_SECRET);
  }

  next();
};

module.exports = currentUser;

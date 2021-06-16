const requireAuth = (req, res, next) => {
  if (!req.currentUser) {
    return res.status(401).send({ msg: 'Require authentication' });
  }

  next();
};

module.exports = requireAuth;

const Portfolio = require('../models/portfolio');
const User = require('../models/user');

const createPortfolio = async (userId, email) => {
  try {
    let user = await User.findById(userId);
    if (user) {
      console.log('User already exists');
    } else {
      user = new User({ _id: userId, email });
      await user.save();
    }

    console.log(user);

    const existingDefaultPortfolio = await Portfolio.find({
      isDefault: true,
      isActive: true,
      user: user._id,
    });

    if (existingDefaultPortfolio.length > 0) {
      console.log('Default portfolio exists for the user');

      return null;
    }

    const portfolio = new Portfolio({
      name: 'MyPortfolio',
      isDefault: true,
      user,
    });
    const newPortfolio = await portfolio.save();
    console.log(newPortfolio);

    return newPortfolio;
  } catch (err) {
    console.log(err);

    return null;
  }
};

const createPortfolioForExistingUser = async (userId) => {
  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      console.log('User does not exists');
    }

    const portfolio = new Portfolio({
      name: 'MyPortfolio',
      isDefault: false,
      user: existingUser,
    });
    const newPortfolio = await portfolio.save();
    console.log(newPortfolio);
    return newPortfolio;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = { createPortfolio, createPortfolioForExistingUser };

const mongoose = require('mongoose');
const User = require('./user');

const portfolioSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

portfolioSchema.build = function (name, isDefault, user) {
  return new Portfolio({
    name,
    isDefault,
    isActive: true,
    user: User.build(user.id, user.email),
  });
};

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;

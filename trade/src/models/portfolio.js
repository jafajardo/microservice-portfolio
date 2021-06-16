const mongoose = require('mongoose');

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

portfolioSchema.statics.build = (attrs) => {
  return new Portfolio({
    _id: attrs.id,
    name: attrs.name,
    isDefault: attrs.isDefault,
    isActive: attrs.isActive,
    user: attrs.user.id,
  });
};

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;

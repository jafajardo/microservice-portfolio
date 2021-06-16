const mongoose = require('mongoose');

const holdingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    portfolio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Portfolio',
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

holdingSchema.statics.build = (attrs) => {
  return new Holding(attrs);
};

const Holding = mongoose.model('Holding', holdingSchema);

module.exports = Holding;

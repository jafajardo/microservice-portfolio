const mongoose = require('mongoose');
const { TradeTypes } = require('@jafajardo-portfolio/common');

const tradeSchema = mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
    },
    date: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    tradeType: {
      type: String,
      required: true,
      default: TradeTypes.Buy,
      enum: Object.values(TradeTypes),
    },
    quantity: {
      type: Number,
      required: true,
    },
    sharePrice: {
      type: Number,
      required: true,
    },
    brokerage: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: 'AUD',
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

tradeSchema.statics.build = (attrs) => {
  return new Trade(attrs);
};

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;

const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    portfolio: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
      },
    ],
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

userSchema.statics.build = function (id, email) {
  return new User({
    _id: id,
    email,
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;

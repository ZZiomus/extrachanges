const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new Schema({
    wallet: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },

    referralCode: {
      type: Schema.Types.ObjectId,
      ref: "ReferalCode",
    },
  })
);

module.exports = User;

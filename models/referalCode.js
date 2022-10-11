const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReferalCode = mongoose.model(
  "ReferalCode",
  new Schema({
    code: {
      type: String,
    },
    referees: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  })
);

module.exports = ReferalCode;

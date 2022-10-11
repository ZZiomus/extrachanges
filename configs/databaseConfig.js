require("dotenv").config({});
const mongoose = require("mongoose");

const username = process.env.db_username || "test";
const password = process.env.db_pass || "test";
const dbname = process.env.db_name || "test";

//const uri = `mongodb+srv://${username}:${password}@cluster0.cnmbib5.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const uri = `mongodb+srv://Hpx:Fivertest123@hpx.powkbof.mongodb.net/hpxdb?retryWrites=true&w=majority`;

const configs = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(uri, configs, (err) => {
  if (!err) {
    console.log("Connected to DB Successfully.");
  } else {
    console.error(err.message);
  }
});

module.exports = mongoose;

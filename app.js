var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");

const cors = require("cors");
const passport = require("./configs/passport");
const helmet = require("helmet");

// import and init db
require("./configs/databaseConfig");

var app = express();
app.use(express.static("public"));

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use("/api/v1", helmet(), require("./routes/index"));

// to render react app view/build pages
app.use(require("./routes/views"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message);
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;

const express = require("express");
const indexRouter = express.Router();

indexRouter.use("/auth", require("./auth"));
indexRouter.use("/admin", require("./admin"));
indexRouter.use("/referral", require("./referral"));

module.exports = indexRouter;

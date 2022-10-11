const express = require("express");
const authRouter = express.Router();
const passport = require("../configs/passport");
const {
  checkSession,
  getConnectedWalletInfo,
} = require("../controller/authController");

/**
 * @dev checks the jwt token's validity. if token is valid, it returns the user info.
 */
authRouter.get(
  "/session",
  passport.authenticate("jwt", { session: false }),
  checkSession
);
authRouter.get("/wallet-connect/:wallet", getConnectedWalletInfo);

module.exports = authRouter;

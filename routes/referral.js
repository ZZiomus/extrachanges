const express = require("express");
const referralRouter = express.Router();
const passport = require("../configs/passport");
const {
  createOrGetReferralInfo,
  checkRefferalCode,
  getAllReferrals,
  joinReferralCode,
} = require("../controller/referralController");

/**
 * @dev it will create referral code or get user info, if referrer, for the connect wallet
 */
referralRouter.post("/referral-code", createOrGetReferralInfo);
/**
 * @dev it will create referral code or get user info, if referrer, for the connect wallet
 */
referralRouter.post("/join-referral-code/:referralCode", joinReferralCode);

/**
 * @dev it will fetch all the wallets which have connected thier wallet via referral link.
 */
referralRouter.get(
  "/wallet-refferals/:wallet",
  passport.authenticate("jwt", { session: false }),
  getAllReferrals
);

/**
 * @dev it will fetch all the wallets which have connected thier wallet via referral link.
 */
referralRouter.get("/check-referral-code/:referralCode", checkRefferalCode);
module.exports = referralRouter;

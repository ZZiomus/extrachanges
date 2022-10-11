const createHttpError = require("http-errors");
const { Web3HTTPInitializer } = require("../configs/web3");
const { ReferalCode, User } = require("../models");
const { USER_TYPES, areEqual } = require("../utils/constats");
const { issueJWT } = require("../utils/passport");

/**
 * @dev it will create referral code or get user info, if referrer, for the connect wallet
 * @param {Object} req is request object
 * @param {Object} res is request object
 * @param {Function} next is middleware function
 * @returns Promise
 */
const createOrGetReferralInfo = async (req, res, next) => {
  try {
    const { web3 } = new Web3HTTPInitializer();
    const { message, signature } = req.body;

    if (!message || !signature) throw new Error(createHttpError(400));

    const walletAddress = await web3.eth.accounts.recover(message, signature);

    // get user data
    let user = await User.findOne({ wallet: walletAddress });

    if (!user) {
      const code = String(walletAddress).slice(0, 4) + Date.now().toString(36);
      const referralCode = new ReferalCode({ code });
      await referralCode.save();

      const referrer = new User({
        wallet: walletAddress,
        type: USER_TYPES.referrer,
        referralCode: referralCode.id,
      });
      user = await referrer.save();
    } else {
      if (user.type !== USER_TYPES.referrer)
        return res
          .status(400)
          .json({ message: "referee cannot create referral code" });
    }

    const userInfo = await User.findOne({ _id: user._id }).populate(
      "referralCode"
    );

    const userPayload = {
      _id: userInfo._id,
      wallet: userInfo.wallet,
      type: userInfo.type,
      referralCode: userInfo.referralCode._id,
      code: userInfo.referralCode.code,
    };

    const token = issueJWT(userPayload);

    res.status(200).json({
      accessToken: token,
      userInfo: userPayload,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @dev it will fetch all the wallets which have connected thier wallet via referral link.
 * @param {Object} req is request object
 * @param {Object} res is request object
 * @param {Function} next is middleware function
 * @returns Promise
 */
const getAllReferrals = async (req, res, next) => {
  try {
    const { wallet } = req.params;
    const user = req.user;

    if (!areEqual(wallet, user.wallet)) return res.sendStatus(403);
    // if user type is not referrer then there will be no referrals and code.
    if (user.type !== USER_TYPES.referrer) return res.sendStatus(400);

    const referralInfo = await ReferalCode.findOne({
      _id: user.referralCode,
    }).populate("referees");

    const userInfo = await User.findOne({ referralCode: referralInfo._id });

    const payload = {
      wallet: userInfo.wallet,
      _id: userInfo._id,
      type: userInfo.type,
      referralInfo,
    };
    res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
};

/**
 * @dev checks the validity of the referral code. if code is valid it returns the referral create info
 * @param {Object} req is request object
 * @param {Object} res is request object
 * @param {Function} next is middleware function
 * @returns Promise
 */
const checkRefferalCode = async (req, res, next) => {
  try {
    const code = req.params.referralCode;

    const referralCodeInfo = await ReferalCode.findOne({ code }).populate(
      "referees"
    );

    if (!referralCodeInfo)
      return res.status(404).json({ message: "code does not exist" });

    const referralInfo = await User.findOne({
      referralCode: referralCodeInfo.id,
    });

    res.status(200).json(referralInfo);
  } catch (err) {
    next(err);
  }
};

/**
 * @dev checks if user exist in database. if does not exist it creates the user as referee of the code's referral.
 * @param {Object} req is request object
 * @param {Object} res is request object
 * @param {Function} next is middleware function
 * @returns Promise
 */
const joinReferralCode = async (req, res, next) => {
  try {
    const { web3 } = new Web3HTTPInitializer();
    const { message, signature } = req.body;

    const code = req.params.referralCode;

    if (!message || !signature || !code) throw new Error(createHttpError(400));

    const walletAddress = await web3.eth.accounts.recover(message, signature);

    let user = await User.findOne({ wallet: walletAddress });

    if (user)
      return res
        .status(400)
        .json({ message: "user already exist. cannot join as referee." });

    const referralCodeInfo = await ReferalCode.findOne({ code });

    if (!referralCodeInfo)
      return res.status(404).json({ message: "referral code does not exist." });

    const referee = new User({
      wallet: walletAddress,
      type: USER_TYPES.referee,
    });
    user = await referee.save();

    await ReferalCode.findOneAndUpdate(
      { code },
      { $push: { referees: referee.id } },
      { new: true, useFindAndModify: false }
    );

    res.status(200).json({ message: "added to referral list successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrGetReferralInfo,
  checkRefferalCode,
  getAllReferrals,
  joinReferralCode,
};

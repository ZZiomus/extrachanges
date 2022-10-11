const { User } = require("../models");
const { issueJWT } = require("../utils/passport");

/**
 * @dev checks the jwt token's validity. if token is valid, it returns the user info.
 * @param {Object} req is request object
 * @param {Object} res is request object
 * @returns void
 */
const checkSession = (req, res) => {
  const user = req.user;
  res.status(200).json(user);
};

const getConnectedWalletInfo = async (req, res, next) => {
  try {
    const { wallet } = req.params;
    if (!wallet) throw new Error(createHttpError(400));

    let user = await User.findOne({ wallet: wallet });

    if (!user)
      return res.status(200).json({ userInfo: { message: "new user" } });

    const userInfo = await User.findOne({ _id: user._id }).populate(
      "referralCode"
    );

    const userPayload = {
      _id: userInfo._id,
      wallet: userInfo.wallet,
      type: userInfo.type,
      referralCode: userInfo.referralCode?._id || null,
      code: userInfo.referralCode?.code || null,
    };

    const token = issueJWT(userPayload);
    return res.status(200).json({
      accessToken: token,
      userInfo: userPayload,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { checkSession, getConnectedWalletInfo };

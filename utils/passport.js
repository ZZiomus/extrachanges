const jsonwebtoken = require("jsonwebtoken");
const { jwtSecretKey } = require("../configs/jwt.config");

/**
 * @dev removes the user info of `wallet` address from local database/storage
 * @param user is the user info object
 * @returns string
 */
const issueJWT = (user) => {
  const _id = user._id;
  const payload = {
    sub: _id,
    expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 1, // one day
  };

  const signedToken = jsonwebtoken.sign(payload, jwtSecretKey);

  return "Bearer " + signedToken;
};

module.exports = { issueJWT };

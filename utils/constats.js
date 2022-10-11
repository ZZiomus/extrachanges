/**
 *
 * @param {any} a is first value to compare
 * @param {any} b is ssecond value to compare
 * @returns {Boolean}
 */
module.exports.areEqual = (a, b) =>
  String(a).toLowerCase() === String(b).toLowerCase();

/**
 * @dev type to identify the user
 */
module.exports.USER_TYPES = {
  referrer: "referrer", // user with a referral code
  referee: "referee", // user who connects with a referral code
};

module.exports.getSha256Hash = (srt) => {
  const crypto = require("crypto");

  // secret or salt to be hashed with
  const secret = Date.now().toString();
  // create a sha-256 hasher
  const sha256Hasher = crypto.createHmac("sha256", secret);

  // hash the string
  // and set the output format
  return sha256Hasher.update(srt).digest("hex");
};

const path = require("path");

const getAboutReferralPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/about-referral.html"));
};

const getViewPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
};

const getPageNotFound = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/404.html"));
};
const getSacrificePage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/sacrifice.html"));
};

module.exports = {
  getAboutReferralPage,
  getViewPage,
  getPageNotFound,
  getSacrificePage,
};

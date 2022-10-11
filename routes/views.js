const express = require("express");
const helmet = require("helmet");
const viewsRouter = express.Router();
const {
  getAboutReferralPage,
  getPageNotFound,
  getViewPage,
  getSacrificePage,
} = require("../controller/viewsController");

/**
 * @dev returns home page html file. these routes are added to handle the react.js routes. it wll redirec the
 */

viewsRouter.get("/referral", helmet(), getViewPage);
viewsRouter.get("/referral/*", helmet(), getViewPage);
viewsRouter.get("/sacrifice", helmet(), getSacrificePage);

// @dev this route does not use helmet. the youtube iframe was being block.
viewsRouter.get("/about-referral", getAboutReferralPage);

viewsRouter.get("/*", getPageNotFound);

module.exports = viewsRouter;

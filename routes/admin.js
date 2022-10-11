const express = require("express");
const adminRouter = express.Router();
const {
  downloadWalletAddresses,
  generateCsvFile,
} = require("../controller/admin.Controller");

/**
 * @dev checks the jwt token's validity. if token is valid, it returns the user info.
 */
adminRouter.post("/download-addresses", downloadWalletAddresses);

adminRouter.get("/wallet-csv/:screct", generateCsvFile);

module.exports = adminRouter;

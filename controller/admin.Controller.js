const createHttpError = require("http-errors");
const { Web3HTTPInitializer } = require("../configs/web3");
const { User } = require("../models");
const CsvParser = require("json2csv").Parser;
const JSONdb = require("simple-json-db");
const { getSha256Hash, USER_TYPES } = require("../utils/constats");
const path = require("path");

const filePath = path.resolve(__dirname, "../models/otp.json");

const OTPsDB = new JSONdb(filePath);

const admin_wallets = ["0x7A09230978485d857489F7Dfb91035D94898800d"];

const downloadWalletAddresses = async (req, res, next) => {
  try {
    const { web3 } = new Web3HTTPInitializer();
    const { message, signature } = req.body;

    if (!message || !signature) throw new Error(createHttpError(400));

    const walletAddress = await web3.eth.accounts.recover(message, signature);

    if (!admin_wallets.includes(walletAddress))
      throw new Error(createHttpError(403));

    const screct = getSha256Hash(walletAddress);

    const expiresIn = Date.now + 3600 * 5; // 10 minutes

    OTPsDB.set(screct, expiresIn);

    res.status(200).json({ link: `api/v1/admin/wallet-csv/${screct}` });
  } catch (err) {
    next(err);
  }
};

const generateCsvFile = async (req, res, next) => {
  try {
    const { screct } = req.params;

    const otpExpression = OTPsDB.get(screct);

    if (!otpExpression || otpExpression < Date.now())
      throw new Error(createHttpError(403));

    const users = await User.find({ type: USER_TYPES.referrer }).populate([
      { path: "referralCode", populate: { path: "referees" } },
    ]);

    let maxListLenght = 0;
    let usersList = [];
    users.forEach((user) => {
      const {
        referralCode: { referees },
      } = user;

      if (referees.length > maxListLenght) maxListLenght = referees.length;
    });

    const totalUsers = users.length;

    for (let j = 0; j < maxListLenght; j++) {
      let row = {};
      for (let i = 0; i < totalUsers; i++) {
        const {
          wallet,
          referralCode: { referees },
        } = users[i];

        row[wallet] = referees[j]?.wallet || "";
      }
      usersList.push(row);
    }

    const csvParser = new CsvParser();
    const csvData = csvParser.parse(usersList);

    const isDeleted = OTPsDB.delete(screct);

    if (!isDeleted) return res.sendStatus(500);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=wallet.csv");

    res.status(200).end(csvData);
  } catch (err) {
    next(err);
  }
};

module.exports = { downloadWalletAddresses, generateCsvFile };

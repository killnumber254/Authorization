const express = require("express");

const router = express.Router();
const passport = require("../passport/passport");
const hat = require("hat");

let token = {
  tokens: hat(),
};

const app = express();

module.exports = router;

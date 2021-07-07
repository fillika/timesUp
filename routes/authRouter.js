const express = require("express");
const router = express.Router();
const { signUp, logIn, reCaptchaVerify } = require("../controllers/authController");

router.post("/signup", reCaptchaVerify, signUp);
router.post("/login", logIn);

module.exports = router;

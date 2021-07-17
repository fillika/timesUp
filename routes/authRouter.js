const express = require("express");
const router = express.Router();
const { signUp, confirmRegister, logIn, preLogIn, forgotPassword, updatePassword, reCaptchaVerify } = require("../controllers/authController");

router.post('/forgotPassword', forgotPassword);
router.patch('/updatePassword', updatePassword);

router.post('/signup', reCaptchaVerify, signUp);
router.post('/confirmRegister/:token', confirmRegister);
router.post('/login', preLogIn, logIn);

module.exports = router;

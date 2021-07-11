const express = require("express");
const router = express.Router();
const { signUp, logIn, forgotPassword, updatePassword, reCaptchaVerify } = require("../controllers/authController");

router.post('/forgotPassword', forgotPassword);
router.patch('/updatePassword/:id', updatePassword);

router.post('/signup', reCaptchaVerify, signUp);
router.post('/login', logIn);

module.exports = router;

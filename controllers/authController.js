var jwt = require("jsonwebtoken");
const { promisify } = require("util");
const asyncCatchHandler = require("../utils/asyncCatchHandler");
const { UserModel } = require("../models/userModel");
const AppError = require("../utils/Error");
const fetch = require('isomorphic-fetch');
const crypto = require('crypto');
const { sendEmail } = require('../utils/nodeMailer');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// Register
const signUp = async (req, res, next) => {
  // проверить, существует ли User по email. Если он существует, выдать ошибку
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await UserModel.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    data: {
      token: token,
      user: {
        name: newUser.name,
      },
    },
  });
};

// Check logged user or not
const checkIsLogin = async (req, res, next) => {
  let token = null;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.slice(7);
  }

  if (!token) {
    return next(new AppError("Please, log in.", 401));
  }

  const verifyPromise = promisify(jwt.verify);
  const decodedData = await verifyPromise(token, process.env.JWT_SECRET);

  const currentUser = await UserModel.findById(decodedData.id);
  const isPasswordChanged = currentUser.checkPasswordDate(decodedData.iat);

  if (isPasswordChanged) {
    return next(
      new AppError("Password recently was change. Please log in again", 401)
    );
  }

  req.user = currentUser;
  next();
};

// Log in
const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please, provide your email and password", 401));
  }
  // Сравнить email и выдать токен
  const currentUser = await UserModel.findOne({ email }).select('+password');
  const isValid = await currentUser.comparePasswords(password, currentUser.password);

  if (!isValid) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(currentUser._id);

  res.status(200).json({
    status: "success",
    data: {
      token,
    },
  });
};

const reCaptchaVerify = async (req, res, next) => {
  const { token } = req.body;
  const secretKey = process.env.RE_CAPTCHA_KEY;
  const captchaVerifyURL = 'https://www.google.com/recaptcha/api/siteverify';

  // https://stackoverflow.com/questions/52416002/recaptcha-error-codes-missing-input-response-missing-input-secret-when-v
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secretKey}&response=${token}`,
  }

  const response = await fetch(captchaVerifyURL, params)
    .then(response => response.json());

  if (response.success) {
    next();
    return;
  }
  next(new AppError('Вы не прошли проверку reCaptcha. Приносим свои извинения. Попробуйте еще раз', 401));
}

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  // Проверить, существует ли email?
  const user = await UserModel.findOne({ email })

  if (!user) {
    return next(new AppError('This email does not exist', 404))
  }

  const resetToken = user.createResetToken();
  await user.save();

  const html = `
Hello friend!
<br>
If you want to reset your password, please, follow to link
<br>
<a href="${req.protocol}://${req.get('host')}/forgotPassword/${resetToken}" target="_blank">Reset password</a>
<br>
If you don't wanna change your password or received this email by mistake
<br>
Please, ignore or delete them.
<br>
Thanks! Have a good day :)
<br>
Times-up TEAM!
`
  // Отправить email
  // await sendEmail(email, 'Восстановление пароля', html)

  res.status(200).json({
    status: 'success',
    data: {
      id: resetToken
    }
  })
}

const updatePassword = async (req, res, next) => {
  const { id ,password, passwordConfirm } = req.body;
  // Это в базу для будущего сравнения

  const hashedToken = crypto
    .createHash('sha256')
    .update(id)
    .digest('hex');

  // Сделать проверку на существование юзера по данному hashedToken
  const user = await UserModel.findOne({
    passwordResetToken: hashedToken, passwordResetTokenDate: {
      $gt: new Date()
    }
  })

  if (!user) {
    return next(new AppError('Token invalid or expired. Please, try reset your password again.', 401))
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  const token = signToken(user._id);

  res.status(201).json({
    status: "success",
    data: {
      token,
    },
  });
}

exports.signUp = asyncCatchHandler(signUp);
exports.checkIsLogin = asyncCatchHandler(checkIsLogin);
exports.logIn = asyncCatchHandler(logIn);
exports.reCaptchaVerify = asyncCatchHandler(reCaptchaVerify);
exports.forgotPassword = asyncCatchHandler(forgotPassword);
exports.updatePassword = asyncCatchHandler(updatePassword);

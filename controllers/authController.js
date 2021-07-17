const jwt = require("jsonwebtoken");
const fs = require('fs');
const { promisify } = require("util");
const asyncCatchHandler = require("../utils/asyncCatchHandler");
const { UserModel } = require("../models/userModel");
const AppError = require("../utils/Error");
const fetch = require('isomorphic-fetch');
const crypto = require('crypto');
const { sendEmail } = require('../utils/nodeMailer');

const resetPasswordEmail = fs.readFileSync(`${__dirname}/../templates/resetPassword.html`, 'utf8');
const registrationEmail = fs.readFileSync(`${__dirname}/../templates/registration.html`, 'utf8');

// Utils
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

const sendConfirmRegEmail = async (user, req) => {
  const token = signToken(user._id);
  
  const href = `${req.protocol}://${req.get('host')}/confirmRegister/${token}`;
  const html = registrationEmail.replace(/{%HREF%}/gi, href).replace(/{%USERNAME%}/gi, user.name)

  // Отправить email
  await sendEmail(req.body.email, 'New register', html);
}

// Register
const signUp = async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await UserModel.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  await sendConfirmRegEmail(newUser, req);

  res.status(201).json({
    status: "success",
    data: null,
  });
};

const confirmRegister = async (req, res, next) => {
  const { token } = req.body;

  if (!token) return next(new AppError("Please, log in.", 401));

  const verifyPromise = promisify(jwt.verify);
  const decodedData = await verifyPromise(token, process.env.JWT_SECRET);
  const currentUser = await UserModel.findById(decodedData.id);

  if (!currentUser) return next(new AppError("User doesn't exist", 404));

  // Если повторно пошел по ссылке
  if (currentUser.registrationConfirm) {
    return next(new AppError("User already confirmed register. Please, log in.", 400));
  }

  currentUser.registrationConfirm = true;
  currentUser.save();

  res.status(201).json({
    status: "success",
  });
}

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

const preLogIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please, provide your email and password", 401));
  }
  // Сравнить email и выдать токен
  const currentUser = await UserModel.findOne({ email }).select('+password');

  if (!currentUser) return next(new AppError("This email doesn't exist", 404));

  // Если пользователь не подтвредил регистрацию, тогда мы отправляем ему повторно письмо
  if (!currentUser.registrationConfirm) {
    await sendConfirmRegEmail(currentUser, req);

    return res.status(204).json({
      status: "success",
    });
  }

  const isValid = await currentUser.comparePasswords(password, currentUser.password);

  if (!isValid) {
    return next(new AppError("Incorrect email or password", 401));
  }

  req.body.user = currentUser;
  next();
}

// Log in
const logIn = async (req, res, next) => {
  const { user } = req.body;

  const token = signToken(user._id);

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
    return next(new AppError('This email doesn\'t exist', 404))
  }

  const resetToken = user.createResetToken();
  await user.save();

  const href = `${req.protocol}://${req.get('host')}/updatePassword/${resetToken}`;
  const html = resetPasswordEmail.replace(/{%HREF%}/gi, href);

  // Отправить email
  await sendEmail(email, 'Восстановление пароля', html)

  res.status(200).json({
    status: 'success',
    data: null
  })
}

const updatePassword = async (req, res, next) => {
  const { id, password, passwordConfirm } = req.body;
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
exports.confirmRegister = asyncCatchHandler(confirmRegister);
exports.checkIsLogin = asyncCatchHandler(checkIsLogin);
exports.logIn = asyncCatchHandler(logIn);
exports.preLogIn = asyncCatchHandler(preLogIn);
exports.reCaptchaVerify = asyncCatchHandler(reCaptchaVerify);
exports.forgotPassword = asyncCatchHandler(forgotPassword);
exports.updatePassword = asyncCatchHandler(updatePassword);

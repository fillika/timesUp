const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your username"],
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    minlength: 8,
    select: false,
    required: [true, "Please provide password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    select: false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenDate: Date,
});

UserSchema.pre("save", async function (next) {
  // Если мы изменяем пароль - то пропускаем этот этап
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 14);
  this.passwordConfirm = undefined;
  this.passwordChangedAt = undefined;
  next();
});

UserSchema.methods.checkPasswordDate = function (tokenTimestamp) {
  if (!this.passwordChangedAt) return false;

  if (this.passwordChangedAt.getTime() / 1000 > tokenTimestamp) {
    return true;
  }

  return false;
};

UserSchema.methods.createResetToken = function () {
  // Это на отправку
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Это в базу для будущего сравнения
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetTokenDate = new Date() + 1000 * 60 * 10;
  return resetToken;
}

UserSchema.methods.comparePasswords = async function (pswFromFrom, pswFromBase) {
  return await bcrypt.compare(pswFromFrom, pswFromBase);
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };

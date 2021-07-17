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
    unique: [true, "Duplicate. Please, use another email"],
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
  registrationConfirm: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 14);
  this.passwordConfirm = undefined;
  this.passwordResetToken = undefined;
  this.passwordResetTokenDate = undefined;
  this.passwordChangedAt = new Date().getTime() - 1000;
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

  this.passwordResetTokenDate = new Date().getTime() + 1000 * 60 * 10;
  return resetToken;
}

UserSchema.methods.comparePasswords = async function (pswFromFrom, pswFromBase) {
  return await bcrypt.compare(pswFromFrom, pswFromBase);
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };

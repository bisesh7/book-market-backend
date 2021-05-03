const mongoose = require("mongoose");
const User = require("./User");

const ResetPasswordCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    ref: "user",
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  validated: {
    type: Boolean,
    default: false,
  },
});

const ResetPasswordCode = mongoose.model(
  "reset_password_code",
  ResetPasswordCodeSchema
);
module.exports = ResetPasswordCode;

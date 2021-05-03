const mongoose = require("mongoose");

const ResetPasswordCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  dateCreated: {
    type: Date,
    value: Date.now(),
  },
});

const ResetPasswordCode = mongoose.model(
  "reset_password_code",
  ResetPasswordCodeSchema
);
module.exports = ResetPasswordCode;

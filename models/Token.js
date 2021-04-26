const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  dateCreated: {
    type: Date,
    value: Date.now(),
  },
});

const Token = mongoose.model("token", TokenSchema);
module.exports = Token;

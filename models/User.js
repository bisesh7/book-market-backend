const mongoose = require("mongoose");

// Create a schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    default: Date.now(),
  },
  phoneNumber: {
    type: Number,
    default: "",
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;

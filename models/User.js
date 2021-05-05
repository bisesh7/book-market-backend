const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("./Token");

// Create a schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      (email) => {
        let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
      },
      "Please give a valid email.",
    ],
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  registerDate: {
    type: Date,
    default: Date.now(),
  },
  phoneNumber: {
    type: Number,
    default: "",
    required: true,
    length: 10,
  },
});

UserSchema.methods = {
  // arrow function should not be used here.
  createAccessToken: async function () {
    try {
      let { _id, email } = this;
      let accessToken = jwt.sign(
        { user: { _id, email } },
        config.get("ACCESS_TOKEN_SECRET"),
        {
          expiresIn: "10m",
        }
      );
      return accessToken;
    } catch (err) {
      console.log(err);
      return;
    }
  },
  createRefreshToken: async function () {
    try {
      let { _id, email } = this;
      let refreshToken = jwt.sign(
        { user: { _id, email } },
        config.get("REFRESH_TOKEN_SECRET"),
        {
          expiresIn: "1d",
        }
      );
      await new Token({ token: refreshToken }).save();
      return refreshToken;
    } catch (err) {
      console.log(err);
      return;
    }
  },
};

const User = mongoose.model("user", UserSchema);
module.exports = User;

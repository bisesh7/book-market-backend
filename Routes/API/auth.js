const express = require("express");
const checkAPIKey = require("../../middlewares/checkAPIKey");
const User = require("../../models/User");
const {
  serverError,
  credentialError,
  tokenError,
} = require("../../utils/errors");
const userValidation = require("../../utils/userValidation");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Token = require("../../models/Token");
const config = require("config");
const jwt = require("jsonwebtoken");

// @route   POST /api/auth/
// @desc    login the user
// @access  public
router.post("/", checkAPIKey, (req, res) => {
  const { email, password } = req.body;

  const validation = userValidation(email, password, null);

  if (!validation.valid) {
    return res
      .status(400)
      .json({ success: false, msg: validation.msg, err: validation.err });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "Invalid credentials.",
          err: credentialError,
        });
      }
      bcrypt.compare(password, user.password).then((valid) => {
        if (!valid) {
          return res.status(400).json({
            success: false,
            msg: "Invalid credentials",
            err: credentialError,
          });
        }

        user.createAccessToken().then((accessToken) => {
          user.createRefreshToken().then((refreshToken) => {
            try {
              res.cookie("x-auth-token", `bearer ${accessToken}`, {
                httpOnly: true,
                // secure: true // only use https
                maxAge: 24 * 60 * 60 * 1000, //24 hours,
              });
              res.cookie("refresh-token", refreshToken, {
                httpOnly: true,
                // secure: true
                maxAge: 24 * 60 * 60 * 1000, //24 hours,
              });
              const userData = user;
              // Deleting password from user data
              userData.password = undefined;
              res.json({
                success: true,
                msg: "You have been logged in.",
                user: userData,
              });
            } catch (err) {
              return res.status(500).json({
                success: false,
                msg: "Server error while setting the cookie.",
                err: serverError,
              });
            }
          });
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        msg: "Server error while finding the user.",
        err: serverError,
      });
    });
});

// @route   POST /api/auth/refresh_token
// @desc    Generates new access-token
// @access  PRIVATE
router.post("/refresh_token", checkAPIKey, (req, res) => {
  try {
    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        msg: "Access denied, no refresh token.",
        err: tokenError,
      });
    } else {
      Token.findOne({ token: refreshToken })
        .then((tokenDoc) => {
          if (!tokenDoc) {
            return res
              .status(401)
              .json({ success: false, msg: "Token expired!", err: tokenError });
          } else {
            try {
              // extract the payload from the token and generate a new access token
              const payLoad = jwt.verify(
                tokenDoc.token,
                config.get("REFRESH_TOKEN_SECRET")
              );
              const accessToken = jwt.sign(
                { user: payLoad.user },
                config.get("ACCESS_TOKEN_SECRET"),
                {
                  expiresIn: "10m",
                }
              );
              res
                .cookie("x-auth-token", `bearer ${accessToken}`, {
                  httpOnly: true,
                  // secure: true // only use https
                  maxAge: 24 * 60 * 60 * 1000, //24 hours,
                })
                .json({
                  success: true,
                  msg: "New access token has been added to the cookies.",
                });
            } catch (err) {
              return res.status(403).json({
                success: false,
                msg: "Access denied, token expired.",
                err: tokenError,
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            success: false,
            msg: "Server error while finding the token",
            err: serverError,
          });
        });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error", err: serverError });
  }
});

// @route   DELETE /api/auth
// @desc    Logout the user
// @access  PRIVATE
router.delete("/", [checkAPIKey], (req, res) => {
  try {
    const refreshToken = req.cookies["refresh-token"];
    Token.findOneAndDelete({ token: refreshToken })
      .then(() => {
        // Delete the cookie in the browser
        res.cookie("x-auth-token", ``, {
          httpOnly: true,
          // secure: true // only use https
          maxAge: 1,
        });
        res.cookie("refresh-token", ``, {
          httpOnly: true,
          // secure: true // only use https
          maxAge: 1,
        });
        return res.json({ success: true, msg: "You have logged out." });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          msg: "Server error while finding the refresh token in the db.",
          err: serverError,
        });
      });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error", err: serverError });
  }
});
module.exports = router;

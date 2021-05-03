const express = require("express");
const checkAPIKey = require("../../middlewares/checkAPIKey");
const User = require("../../models/User");
const userValidation = require("../../utils/userValidation");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {
  userExistsError,
  serverError,
  credentialError,
} = require("../../utils/errors");
const { checkAccessRights } = require("../../middlewares/checkAccessRights");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

// @route   POST /api/user/
// @desc    Create a new user.
// @access  public
router.post("/", checkAPIKey, (req, res) => {
  const { email, password, phoneNumber } = req.body;

  const validation = userValidation(email, password, phoneNumber);
  if (!validation.valid) {
    return res
      .status(400)
      .json({ success: false, msg: validation.msg, err: validation.err });
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          success: false,
          msg: "User already exists, please login.",
          err: userExistsError,
        });
      }
      const newUser = new User({
        email,
        password,
        phoneNumber,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            msg: "Server error while generating salt.",
            err: serverError,
          });
        }
        bcrypt.hash(newUser.password, salt, (err, passwordHash) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              msg: "Server error while generating password hash",
              err: serverError,
            });
          }

          newUser.password = passwordHash;

          newUser.save().then(() => {
            return res.json({
              success: true,
              msg: "New user has been created.",
            });
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

// @route   GET /api/user
// @desc    Gets the current user.
// @access  Private
router.get("/", [checkAPIKey, checkAccessRights], (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      const userData = user;
      userData.password = undefined;
      return res.json({ success: true, user: userData });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        msg: "Server error while finding the user",
        err: serverError,
      });
    });
});

// @route   post /api/user/forget_password/:email
// @desc    Checks the user and sends OTP to the user
// @access  Public
router.post("/forget_password/", [checkAPIKey], async (req, res) => {
  const { email } = req.body;
  console.log(email);
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "Credential Error",
          err: credentialError,
        });
      }

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "bookmarketadmeen@gmail.com",
          pass: "l>%Ww09itcu~6$",
        },
      });

      // send mail with defined transport object
      transporter
        .sendMail({
          from: '"Admin" <book_market_admin@bookmarket.com>', // sender address
          to: email, // receiver
          subject: "Password Reset", // Subject line
          text: `Your code: ${uuidv4()}`, // plain text body
        })
        .then((info) => {
          console.log("Message Sent", info);
          return res.json({
            success: true,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            success: false,
            msg: "Server error while sending the user email.",
            err: serverError,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        msg: "Server error while finding the user email.",
        err: serverError,
      });
    });
});

module.exports = router;

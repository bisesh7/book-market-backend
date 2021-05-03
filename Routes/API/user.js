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
const { v4: uuidv4 } = require("uuid");
const sendMail = require("../../utils/sendEmail");
const ResetPasswordCode = require("../../models/ResetPasswordCode");
const getHash = require("../../utils/getHash");

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

        try {
          const hash = getHash(newUser.password);
          newUser.password = hash;

          newUser
            .save()
            .then(() => {
              return res.json({
                success: true,
                msg: "New user has been created.",
              });
            })
            .catch((err) => {
              return res.status(500).json({
                success: false,
                msg: "Server error while saving the user.",
                err: serverError,
              });
            });
        } catch (err) {
          return res.status(500).json({
            success: false,
            msg: "Server error while hashing the password.",
            err: serverError,
          });
        }
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

      let code = uuidv4();
      let newResetPasswordCode = new ResetPasswordCode({
        code: getHash(code),
      });
      newResetPasswordCode.save().then(() => {
        sendMail(email, `Your code: ${uuidv4()}`)
          .then((info) => {
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

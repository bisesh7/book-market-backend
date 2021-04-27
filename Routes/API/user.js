const express = require("express");
const checkAPIKey = require("../../middlewares/checkAPIKey");
const User = require("../../models/User");
const userValidation = require("../../utils/userValidation");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { userExistsError, serverError } = require("../../utils/errors");
const { checkAccessRights } = require("../../middlewares/checkAccessRights");

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
  return res.json({ success: true, user: req.user });
});

module.exports = router;

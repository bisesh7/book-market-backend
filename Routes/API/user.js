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
  invalidResetCodeError,
  samePasswordError,
} = require("../../utils/errors");
const { checkAccessRights } = require("../../middlewares/checkAccessRights");
const { v4: uuidv4 } = require("uuid");
const sendMail = require("../../utils/sendEmail");
const ResetPasswordCode = require("../../models/ResetPasswordCode");
const getHash = require("../../utils/getHash");

// @route   POST /api/user/
// @desc    Create a new user.
// @access  public
// FIXME: separate validations for email, password and phoneNumber
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

// @route   post /api/user/reset_password/
// @desc    Checks the user and sends OTP to the user
// @access  Public
// TODO: Email validation, When new request comes check if token for
//  the user is already in the database
router.post("/reset_password/", [checkAPIKey], (req, res) => {
  const { email } = req.body;
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
        userEmail: email,
      });
      newResetPasswordCode.save().then(() => {
        sendMail(email, `Your code: ${code}`)
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

// @route   post /api/user/reset_password/validate_code
// @desc    Compare the code given by user and code in the db
// @access  Public
// TODO: Email validation, Code validation
router.post("/reset_password/validate_code", [checkAPIKey], (req, res) => {
  const { email, code } = req.body;

  ResetPasswordCode.findOne({ userEmail: email }).then((document) => {
    bcrypt.compare(code, document.code).then((valid) => {
      if (!valid) {
        return res.status(400).json({
          success: false,
          msg: "Code is invalid",
          err: invalidResetCodeError,
        });
      }
      document.validated = true;
      document
        .save()
        .then(() => {
          return res.json({ success: true });
        })
        .catch((err) => {
          return res.status(500).json({
            success: false,
            msg: "Server error while saving the document",
            err: serverError,
          });
        });
    });
  });
});

// @route   put /api/user/reset_password/change_password
// @desc    Change the password of the user if the code is validated
// @access  Public
// TODO: Email validation, Code validation
// FIXME: Validate Code as well
router.put("/reset_password/change_password", [checkAPIKey], (req, res) => {
  const { email, password } = req.body;

  ResetPasswordCode.findOne({ userEmail: email }).then((document) => {
    if (!document) {
      return res.status(400).json({
        success: false,
        msg: "Credential Error",
        err: credentialError,
      });
    }

    if (!document.validated) {
      return res.status(400).json({
        success: false,
        msg: "Please validate the code.",
        err: invalidResetCodeError,
      });
    }

    User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "Credential Error",
          err: credentialError,
        });
      }
      bcrypt.compare(password, user.password).then((same) => {
        if (same) {
          return res.status(400).json({
            success: false,
            msg: "Please enter a different password from before.",
            err: samePasswordError,
          });
        }
        user.password = getHash(password);
        user
          .save()
          .then(() => {
            document
              .remove()
              .then(() => {
                return res.json({ success: true });
              })
              .catch((err) => {
                return res.status(500).json({
                  success: false,
                  msg: "Server error while deleting the reset password code.",
                  err: serverError,
                });
              });
          })
          .catch((err) => {
            return res.status(500).json({
              success: false,
              msg: "Server error while finding the user",
              err: serverError,
            });
          });
      });
    });
  });
});

module.exports = router;

const express = require("express");
const checkAuth = require("../../middlewares/checkAuth");
const User = require("../../models/User");
const userSignUpValidation = require("../../utils/userSignUpValidation");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/", checkAuth, (req, res) => {
  const { email, password, phoneNumber } = req.body;

  const validation = userSignUpValidation(email, password, phoneNumber);
  if (!validation.valid) {
    return res.status(400).json({ success: false, msg: validation.msg });
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ success: false, msg: "User already exists." });
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
          });
        }
        bcrypt.hash(newUser.password, salt, (err, passwordHash) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              msg: "Server error while generating password hash",
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
      console.log(err);
    });
});

module.exports = router;

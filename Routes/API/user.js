const express = require("express");
const checkAuth = require("../../middlewares/checkAuth");
const userSignUpValidation = require("../../utils/userSignUpValidation");
const router = express.Router();

router.post("/", checkAuth, (req, res) => {
  const { email, password, phoneNumber } = req.body;

  const validation = userSignUpValidation(email, password, phoneNumber);
  if (!validation.valid) {
    return res.status(400).json({ success: false, msg: validation.msg });
  }

  console.log(req.body);

  return res.json({ success: true });
});

module.exports = router;

const express = require("express");
const checkAuth = require("../../middlewares/checkAuth");
const router = express.Router();

router.post("/", checkAuth, (req, res) => {
  //   const { email, password, phoneNumber } = req.params;
  console.log(req.body);
  return res.json({ success: true });
});

module.exports = router;

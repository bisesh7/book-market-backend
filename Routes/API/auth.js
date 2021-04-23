const express = require("express");
const checkAuth = require("../../middlewares/checkAuth");
const router = express.Router();

router.post("/", checkAuth, (req, res) => {
  //   const { email, password, phoneNumber } = req.params;
});

module.exports = router;

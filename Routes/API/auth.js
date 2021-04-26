const express = require("express");
const checkAuth = require("../../middlewares/checkAuth");
const router = express.Router();

// @route   POST /api/auth/
// @desc    login the user
// @access  public
router.post("/", checkAuth, (req, res) => {
  //   const { email, password, phoneNumber } = req.params;
});

module.exports = router;

const express = require("express");
const checkAuth = require("../../middlewares/checkAuth");
const userValidation = require("../../utils/userValidation");
const router = express.Router();

// @route   POST /api/auth/
// @desc    login the user
// @access  public
router.post("/", checkAuth, (req, res) => {
  const { email, password } = req.body;

  const validation = userValidation(email, password, null);

  if (!validation.valid) {
    return res
      .status(400)
      .json({ success: false, msg: validation.msg, err: validation.err });
  }

  return res.json({ success: true });
});

module.exports = router;

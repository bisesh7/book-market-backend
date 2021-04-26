const express = require("express");
const router = express.Router();
const books = require("../../data/book_set.json");
const checkAPIKey = require("../../middlewares/checkAPIKey");

// @route   GET /api/books/
// @desc    Get the list of books.
// @access  public
router.get("/", checkAPIKey, (req, res) => {
  return res.json({ success: true, books });
});

module.exports = router;

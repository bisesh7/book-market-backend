const express = require("express");
const router = express.Router();
const books = require("../../data/book_set.json");
const config = require("config");
const checkAuth = require("../../middlewares/checkAuth");

// @route   GET /api/books/
// @desc    Get the list of books.
// @access  public
router.get("/", checkAuth, (req, res) => {
  return res.json({ success: true, books });
});

module.exports = router;

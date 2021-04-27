const express = require("express");
const router = express.Router();
// const books = require("../../data/book_set.json");
const checkAPIKey = require("../../middlewares/checkAPIKey");
const Book = require("../../models/Book");

// @route   GET /api/books/
// @desc    Get the list of books.
// @access  public
router.get("/", checkAPIKey, (req, res) => {
  Book.find({}).then((books) => {
    return res.json({ success: true, books });
  });
});

// @route   GET /api/books/
// @desc    Populate the books model with the book-set.
// @access  public
// router.get("/add_books", checkAPIKey, (req, res) => {
//   Book.insertMany(books).then(() => {
//     return res.json({ success: true });
//   });
// });

module.exports = router;

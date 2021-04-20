const express = require("express");
const router = express.Router();
const books = require("../../data/book_set.json");

router.get("/", (req, res) => {
  return res.json({ success: true, books });
});

module.exports = router;

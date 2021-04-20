const express = require("express");
const router = express.Router();
const books = require("../../data/book_set.json");
const config = require("config");

router.get("/", (req, res) => {
  const API_KEY = req.headers.authorization;

  if (API_KEY !== config.get("API_KEY")) {
    return res.status(403).json({ success: false, msg: "Unauthorized access" });
  }

  return res.json({ success: true, books });
});

module.exports = router;

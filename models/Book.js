const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  "name ": {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  published_date: {
    type: Date,
    required: true,
  },
});

const Book = mongoose.model("book", BookSchema);

module.exports = Book;

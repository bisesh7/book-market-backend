const express = require("express");
const { checkAccessRights } = require("../../middlewares/checkAccessRights");
const checkAPIKey = require("../../middlewares/checkAPIKey");
const Book = require("../../models/Book");
const UserBooksPurchase = require("../../models/UserBooksPurchase");
const booksPurchasedValidation = require("../../utils/booksPurchasedValidation");
const {
  serverError,
  stockError,
  amountError,
  bookError,
} = require("../../utils/errors");
const router = express.Router();
const async = require("async");

// @route   POST /api/purchase_book/
// @desc    Adds the purchase history to the db
// @access  private
router.post("/", [checkAPIKey, checkAccessRights], async (req, res) => {
  const {
    purchasedBooks,
    usedCoupon,
    subTotalAmount,
    discount,
    totalAmount,
  } = req.body;

  const userId = req.user._id;

  //   Validation
  const purchaseValidation = booksPurchasedValidation(
    purchasedBooks,
    usedCoupon,
    subTotalAmount,
    discount,
    totalAmount
  );

  const setPurchaseValidation = (valid, msg, err) => {
    purchaseValidation.valid = valid;
    purchaseValidation.msg = msg;
    purchaseValidation.err = err;
  };

  let purchasedBookIds = [];
  purchasedBooks.forEach((bookPurchased) => {
    purchasedBookIds.push(bookPurchased.bookId);
  });

  // If there is no books in purchasedBooks, then there is error in client
  if (!purchasedBookIds.length) {
    return res.status(400).json({
      success: false,
      msg: "Please provide the books to purchase.",
      err: bookError,
    });
  }

  // Get the books purchases from the database
  const books = await Book.find({ id: { $in: purchasedBookIds } });

  // Book purchased validation
  if (!books.length) {
    return res.status(400).json({
      success: false,
      msg: "Books with given book id were not found",
      err: bookError,
    });
  }

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    // If the stock of book is 0 then client has errors
    if (book.stock <= 0) {
      setPurchaseValidation(
        false,
        `Stock of ${book["name "]} is 0`,
        stockError
      );
      break;
    }
    for (let j = 0; j < purchasedBooks.length; j++) {
      const bookPurchased = purchasedBooks[j];
      // If the stock - quantity is less than 0 in one of the books purchased, client has errors
      if (book.id === bookPurchased.bookId) {
        if (book.stock - bookPurchased.quantity < 0) {
          setPurchaseValidation(
            false,
            `Only ${book.stock} ${book["name "]} is left.`,
            stockError
          );
          break;
        }

        // Checking the amount calculated in the client
        if (
          parseFloat(book.price.slice(1)) * bookPurchased.quantity !==
          bookPurchased.amount
        ) {
          setPurchaseValidation(
            false,
            `Amount calculated is not correct for ${book["name "]}.`,
            amountError
          );
          break;
        }
      }
    }
  }

  if (!purchaseValidation.valid) {
    return res.status(400).json({
      success: false,
      msg: purchaseValidation.msg,
      err: purchaseValidation.err,
    });
  }

  const savePromises = [];

  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    for (let j = 0; j < purchasedBooks.length; j++) {
      const bookPurchased = purchasedBooks[j];
      if (book.id === bookPurchased.bookId) {
        book.stock -= bookPurchased.quantity;
        savePromises.push((cb) => {
          book.save().then(() => {
            cb(null, i);
          });
        });
      }
    }
  }

  async.parallel(savePromises).then((result) => {
    if (result.length !== books.length) {
      // err
    }
    console.log(result);
  });

  const newUserBooksPurchase = new UserBooksPurchase({
    userId,
    purchasedBooks,
    usedCoupon,
    discount,
    subTotalAmount,
    totalAmount,
  });

  return res.json({ success: true });

  //   newUserBooksPurchase
  //     .save()
  //     .then(() => {
  //       return res.json({ success: true });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return res.status(500).json({
  //         success: false,
  //         msg: "Server error while saving the purchased books",
  //         err: serverError,
  //       });
  //     });
});

module.exports = router;

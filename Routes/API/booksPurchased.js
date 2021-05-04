const express = require("express");
const { checkAccessRights } = require("../../middlewares/checkAccessRights");
const checkAPIKey = require("../../middlewares/checkAPIKey");
const Book = require("../../models/Book");
const UserBooksPurchase = require("../../models/UserBooksPurchase");
const booksPurchasedValidation = require("../../utils/booksPurchasedValidation");
const { serverError, stockError, amountError } = require("../../utils/errors");
const router = express.Router();

// @route   POST /api/purchase_book/
// @desc    Adds the purchase history to the db
// @access  private
router.post("/", [checkAPIKey, checkAccessRights], (req, res) => {
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

  // Get the books purchases from the database
  Book.find({ id: { $in: purchasedBookIds } }).then((books) => {
    // Book purchased validation
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

          console.log(
            book["name "],
            parseFloat(book.price.slice(1)),
            "*",
            bookPurchased.quantity,
            "=",
            parseFloat(book.price.slice(1)) * bookPurchased.quantity
          );

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

    if (purchaseValidation.valid) {
      const newUserBooksPurchase = new UserBooksPurchase({
        userId,
        purchasedBooks,
        usedCoupon,
        discount,
        subTotalAmount,
        totalAmount,
      });

      return res.json({ success: true });
    } else {
      return res.status(400).json({
        success: false,
        msg: purchaseValidation.msg,
        err: purchaseValidation.err,
      });
    }
  });

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

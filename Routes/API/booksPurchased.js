const express = require("express");
const { checkAccessRights } = require("../../middlewares/checkAccessRights");
const checkAPIKey = require("../../middlewares/checkAPIKey");
const Book = require("../../models/Book");
const UserBooksPurchase = require("../../models/UserBooksPurchase");
const { serverError, bookError } = require("../../utils/errors");
const router = express.Router();
const async = require("async");
const {
  booksPurchasedValidation,
  bookPurchasedCompareToDatabaseValidation,
  getUserIdValidation,
} = require("../../utils/booksPurchasedValidation");
const booksPurchaseRollback = require("../../utils/booksPurchaseRollback");

// @route   POST /api/purchase_book/
// @desc    Adds the purchase history to the db
// @access  PRIVATE
router.post("/", [checkAPIKey, checkAccessRights], async (req, res) => {
  const {
    purchasedBooks,
    usedCoupon,
    subTotalAmount,
    discount,
    totalAmount,
  } = req.body;

  const purchasingUser = req.user._id;

  //   Validation
  let purchaseValidation = booksPurchasedValidation(
    purchasedBooks,
    usedCoupon,
    subTotalAmount,
    discount,
    totalAmount
  );

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

  // Further validation which need books in database for comparison
  purchaseValidation = bookPurchasedCompareToDatabaseValidation(
    books,
    purchasedBooks
  );

  // If invalid we respond the error to the client
  if (!purchaseValidation.valid) {
    return res.status(400).json({
      success: false,
      msg: purchaseValidation.msg,
      err: purchaseValidation.err,
    });
  }

  // If everything is valid we create a new purchase
  const newUserBooksPurchase = new UserBooksPurchase({
    purchasingUser,
    purchasedBooks,
    usedCoupon,
    discount,
    subTotalAmount,
    totalAmount,
  });

  // We save the new purchase data to the database
  newUserBooksPurchase
    .save()
    .then((userBooksPurchaseData) => {
      // We have to decrease the stock in the database for each books purchased by the user.
      const savePromises = [];

      // We loop through the books
      for (let i = 0; i < books.length; i++) {
        const book = books[i];

        // test
        // i === 0 ? (book.id = undefined) : null;

        // In order to update the stock of book we need to compare it with books purchased
        for (let j = 0; j < purchasedBooks.length; j++) {
          const bookPurchased = purchasedBooks[j];
          if (book.id === bookPurchased.bookId) {
            // We push the update query to the array to execute every queries
            // We need to know when the database has been updated
            savePromises.push((cb) => {
              Book.updateOne(
                { id: bookPurchased.bookId },
                {
                  stock: book.stock - bookPurchased.quantity,
                }
              ).then((result) => {
                cb(null, result);
              });
            });
          }
        }
      }

      // We update the database here
      async.parallel(savePromises).then((result) => {
        // After the database has been updated the length of the result needs to be equal
        // to the length of the books if not the we need to rollback the changes.
        if (result.length !== books.length) {
          // Rollback all the changes made to the database
          booksPurchaseRollback(userBooksPurchaseData._id, books, () => {
            return res.status(500).json({
              success: false,
              msg:
                "Server error while decreasing the stock of purchased books.",
              err: serverError,
            });
          });
        } else {
          return res.json({ success: true });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        msg: "Server error while saving the purchased books.",
        err: serverError,
      });
    });
});

// @route   GET /api/purchase_book/:userId
// @desc    Get all the books purchased data of the given user
// @access  PRIVATE
router.get("/:userId", [checkAPIKey, checkAccessRights], async (req, res) => {
  const { userId } = req.params;

  const userIdValidation = getUserIdValidation(userId, req.user._id);

  if (!userIdValidation.valid) {
    return res.status(userIdValidation.status).json({
      success: false,
      msg: userIdValidation.msg,
      err: userIdValidation.err,
    });
  }

  UserBooksPurchase.find({ purchasingUser: userId })
    .then((booksPurchased) => {
      return res.json({ success: true, booksPurchased });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        msg: "Server error while finding the user book purchase record",
        err: serverError,
      });
    });
});

module.exports = router;

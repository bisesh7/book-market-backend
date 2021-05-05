const {
  amountError,
  bookError,
  stockError,
  forbiddenError,
} = require("./errors");
const { isBoolean, isNumber } = require("./booksPurchasedValidationFunctions");
const {
  detailsError,
  useCouponError,
  subTotalError,
  discountError,
  totalError,
} = require("./errors");
const { isDefined } = require("./userValidationFunctions");
const mongoose = require("mongoose");

const booksPurchasedValidation = (
  purchasedBooks,
  usedCoupon,
  subTotalAmount,
  discount,
  totalAmount
) => {
  const getErrorJSON = (msg, err) => {
    return {
      valid: false,
      msg,
      err,
    };
  };

  if (
    !isDefined(purchasedBooks) ||
    !isDefined(usedCoupon) ||
    !isDefined(subTotalAmount) ||
    !isDefined(discount) ||
    !isDefined(totalAmount)
  ) {
    return getErrorJSON("Some fields are missing", detailsError);
  }

  if (!isBoolean(usedCoupon)) {
    return getErrorJSON("Please provide a valid value", useCouponError);
  }

  if (!isNumber(discount)) {
    return getErrorJSON("Please provide a valid value", discountError);
  }

  if (usedCoupon) {
    if (discount === 0) {
      return getErrorJSON(
        "Discount cannot be 0 if coupon is used",
        discountError
      );
    }
  }

  if (!isNumber(subTotalAmount)) {
    return getErrorJSON("Please provide a valid value", subTotalError);
  }

  if (!isNumber(totalAmount)) {
    return getErrorJSON("Please provide a valid value", totalError);
  }

  if (totalAmount !== subTotalAmount - discount) {
    return getErrorJSON("Total amount is not valid", totalError);
  }

  return {
    valid: true,
    msg: "Everything is valid",
  };
};

const bookPurchasedCompareToDatabaseValidation = (books, purchasedBooks) => {
  // Book purchased validation
  if (!books.length) {
    return {
      valid: false,
      msg: "Books with given book id were not found",
      err: bookError,
    };
  }

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    // If the stock of book is 0 then client has errors
    if (book.stock <= 0) {
      return {
        valid: false,
        msg: `Stock of ${book["name "]} is 0`,
        err: stockError,
      };
    }

    for (let j = 0; j < purchasedBooks.length; j++) {
      const bookPurchased = purchasedBooks[j];
      // If the stock - quantity is less than 0 in one of the books purchased, client has errors
      if (book.id === bookPurchased.bookId) {
        if (book.stock - bookPurchased.quantity < 0) {
          return {
            valid: false,
            msg: `Only ${book.stock} ${book["name "]} is left.`,
            err: stockError,
          };
        }

        // Checking the amount calculated in the client
        if (
          parseFloat(book.price.slice(1)) * bookPurchased.quantity !==
          bookPurchased.amount
        ) {
          console.log(bookPurchased);
          return {
            valid: false,
            msg: `Amount calculated is not correct for ${book["name "]}.`,
            err: amountError,
          };
        }
      }
    }
  }

  return {
    valid: true,
    msg: "Everything is valid",
  };
};

const getUserIdValidation = (id, inSessionUserId) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return {
      valid: false,
      msg: "Please provide a valid user id.",
      err: detailsError,
      status: 400,
    };
  }

  if (id !== inSessionUserId) {
    return {
      valid: false,
      msg: "Forbidden",
      err: forbiddenError,
      status: 403,
    };
  }

  return {
    valid: true,
    msg: "Everything is good",
  };
};

module.exports = {
  booksPurchasedValidation,
  bookPurchasedCompareToDatabaseValidation,
  getUserIdValidation,
};

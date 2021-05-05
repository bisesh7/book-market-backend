const mongoose = require("mongoose");

const BookPurchaseSchema = mongoose.Schema({
  purchasingUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  purchasedBooks: [
    {
      bookId: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  subTotalAmount: {
    type: Number,
    required: true,
  },
  usedCoupon: {
    type: Boolean,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const UserBooksPurchase = mongoose.model(
  "user_book_purchases",
  BookPurchaseSchema
);

module.exports = UserBooksPurchase;

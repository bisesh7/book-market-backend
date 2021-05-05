const Book = require("../models/Book");
const UserBooksPurchase = require("../models/UserBooksPurchase");
const async = require("async");

const booksPurchaseRollback = (purchaseDataId, books, cb) => {
  UserBooksPurchase.findByIdAndRemove(purchaseDataId).then(() => {
    const savePromises = [];
    for (let i = 0; i < books.length; i++) {
      const book = books[i];

      savePromises.push((cb) => {
        Book.updateOne(
          { id: book.id },
          {
            stock: book.stock,
          }
        ).then((result) => {
          cb(null, result);
        });
      });
    }

    async.parallel(savePromises).then((result) => {
      cb();
    });
  });
};

module.exports = booksPurchaseRollback;

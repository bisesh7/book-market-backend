const { isBoolean, isNumber } = require("./booksPurchasedValidationFunctions");
const {
  detailsError,
  useCouponError,
  subTotalError,
  discountError,
  totalError,
} = require("./errors");
const { isDefined } = require("./userValidationFunctions");

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

module.exports = booksPurchasedValidation;

const { phoneNumberError } = require("./errors");
const {
  stringIsNumber,
  lengthIsEqualTo10,
} = require("./userValidationFunctions");

const phoneNumberValidation = (phoneNumber) => {
  if (!stringIsNumber(phoneNumber)) {
    return {
      success: false,
      msg: "Phone number must be a number.",
      err: phoneNumberError,
    };
  }

  if (!lengthIsEqualTo10(phoneNumber)) {
    return {
      success: false,
      msg: "Phone number length is not equal to 10.",
      err: phoneNumberError,
    };
  }

  return {
    success: true,
    msg: "Phone number valid.",
  };
};

module.exports = phoneNumberValidation;

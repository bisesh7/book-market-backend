const {
  emailError,
  detailsError,
  phoneNumberError,
  passwordError,
} = require("./errors");
const {
  emailIsValid,
  stringIsNumber,
  isDefined,
  lengthIsLessThan8,
  stringHasOneNumber,
  stringHasOneLowercaseLetter,
  stringHasOneUppercaseLetter,
  stringHasOneSpecialCharacter,
  lengthIsEqualTo10,
} = require("./userValidationFunctions");

module.exports = (email, password, phoneNumber) => {
  let valid = false;

  let errors = [detailsError, emailError, phoneNumberError, passwordError];

  //   Validation
  if (!isDefined(email) || !isDefined(password) || !isDefined(phoneNumber)) {
    return { valid, msg: "Please give all your details.", err: errors[0] };
  }

  if (!emailIsValid(email)) {
    return { valid, msg: "Invalid email address.", err: errors[1] };
  }

  if (!stringIsNumber(phoneNumber)) {
    return {
      valid,
      msg: "Phone number must be a number.",
      err: errors[2],
    };
  }

  if (!lengthIsEqualTo10(phoneNumber)) {
    return {
      valid,
      msg: "Phone number length is not equal to 10.",
      err: errors[2],
    };
  }

  if (lengthIsLessThan8(password)) {
    return { valid, msg: "Password length less than 8.", err: errors[3] };
  }

  if (!stringHasOneNumber(password)) {
    return {
      valid,
      msg: "Password should contain at least 1 number.",
      err: errors[3],
    };
  }

  if (!stringHasOneSpecialCharacter(password)) {
    return {
      valid,
      msg: "Password should contain at least 1 special character.",
      err: errors[3],
    };
  }

  if (!stringHasOneLowercaseLetter(password)) {
    return {
      valid,
      msg: "Password should contain at least 1 lowercase letter.",
      err: errors[3],
    };
  }

  if (!stringHasOneUppercaseLetter(password)) {
    return {
      valid,
      msg: "Password should contain at least 1 uppercase letter.",
      err: errors[3],
    };
  }

  return { valid: true };
};

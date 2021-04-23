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

  //   Validation
  if (!isDefined(email) || !isDefined(password) || !isDefined(phoneNumber)) {
    return { valid, msg: "Please give all your details." };
  }

  if (!emailIsValid(email)) {
    return { valid, msg: "Invalid email address." };
  }

  if (!stringIsNumber(phoneNumber)) {
    return { valid, msg: "Phone number must be a number." };
  }

  if (!lengthIsEqualTo10(phoneNumber)) {
    return { valid, msg: "Phone number length is not equal to 10." };
  }

  if (lengthIsLessThan8(password)) {
    return { valid, msg: "Password length less than 8." };
  }

  if (!stringHasOneNumber(password)) {
    return { valid, msg: "Password should contain at least 1 number." };
  }

  if (!stringHasOneSpecialCharacter(password)) {
    return {
      valid,
      msg: "Password should contain at least 1 special character.",
    };
  }

  if (!stringHasOneLowercaseLetter(password)) {
    return {
      valid,
      msg: "Password should contain at least 1 lowercase letter.",
    };
  }

  if (!stringHasOneUppercaseLetter(password)) {
    return {
      valid,
      msg: "Password should contain at least 1 uppercase letter.",
    };
  }

  return { valid: true };
};

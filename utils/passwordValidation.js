const { passwordError } = require("./errors");
const {
  isDefined,
  lengthIsLessThan8,
  stringHasOneNumber,
  stringHasOneSpecialCharacter,
  stringHasOneLowercaseLetter,
  stringHasOneUppercaseLetter,
} = require("./userValidationFunctions");

const passwordValidation = (password) => {
  const getJSONWithErrorMessage = (msg) => {
    return {
      success: false,
      msg,
      err: passwordError,
    };
  };
  if (!isDefined(password)) {
    return getJSONWithErrorMessage("Password is not defined.");
  }
  if (lengthIsLessThan8(password)) {
    return getJSONWithErrorMessage("Password length less than 8.");
  }
  if (!stringHasOneNumber(password)) {
    return getJSONWithErrorMessage(
      "Password should contain at least 1 number."
    );
  }
  if (!stringHasOneSpecialCharacter(password)) {
    return getJSONWithErrorMessage(
      "Password should contain at least 1 special character."
    );
  }
  if (!stringHasOneLowercaseLetter(password)) {
    return getJSONWithErrorMessage(
      "Password should contain at least 1 lowercase letter."
    );
  }
  if (!stringHasOneUppercaseLetter(password)) {
    return getJSONWithErrorMessage(
      "Password should contain at least 1 uppercase letter."
    );
  }
  return {
    success: true,
    msg: "Password is valid.",
  };
};
module.exports = passwordValidation;

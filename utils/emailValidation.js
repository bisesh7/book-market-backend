const { emailError } = require("./errors");
const { isDefined, emailIsValid } = require("./userValidationFunctions");

const emailValidation = (email) => {
  // Email is not defined
  if (!isDefined(email)) {
    return { success: false, msg: "Email is not defined.", err: emailError };
  }
  // Email is not valid
  if (!emailIsValid(email)) {
    return { success: false, msg: "Email is invalid.", err: emailError };
  }
  // Email is valid
  return { success: true, msg: "Email is valid." };
};

module.exports = emailValidation;

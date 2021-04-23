module.exports = {
  isDefined: (value) => typeof value !== "undefined",
  emailIsValid: (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email),
  stringIsNumber: (value) => !isNaN(Number(value)),
  lengthIsEqualTo10: (value) => value.length === 10,
  lengthIsLessThan8: (value) => value.length < 8,
  stringHasOneNumber: (value) => /[0-9]/i.test(value),
  stringHasOneSpecialCharacter: (value) => /[!@#$%^&*]/i.test(value),
  stringHasOneLowercaseLetter: (value) => /[a-z]/.test(value),
  stringHasOneUppercaseLetter: (value) => /[A-Z]/.test(value),
};

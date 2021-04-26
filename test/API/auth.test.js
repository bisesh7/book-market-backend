const assert = require("chai").assert;
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
} = require("../../utils/userValidationFunctions");

describe("Bisesh12! is a valid password.", () => {
  let testPassword = "Bisesh12!";
  it("is defined", () => {
    assert.isTrue(isDefined(testPassword));
  });
  it("has more than 8 characters", () => {
    assert.isFalse(lengthIsLessThan8(testPassword));
  });
  it("has one number", () => {
    assert.isTrue(stringHasOneNumber(testPassword));
  });
  it("has one special character", () => {
    assert.isTrue(stringHasOneSpecialCharacter(testPassword));
  });
  it("has one lowercase character", () => {
    assert.isTrue(stringHasOneLowercaseLetter(testPassword));
  });
  it("has one uppercase character", () => {
    assert.isTrue(stringHasOneUppercaseLetter(testPassword));
  });
});

describe("bisesh.shakya@gmail.com is a valid email.", () => {
  let email = "bisesh.shakya@gmail.com";

  it("is defined", () => {
    assert.isTrue(isDefined(email));
  });

  it("is valid email", () => {
    assert.isTrue(emailIsValid(email));
  });
});

describe("9887055069 is a valid phone number.", () => {
  let phoneNumber = "9887055069";

  it("is defined", () => {
    assert.isTrue(isDefined(phoneNumber));
  });

  it("has 10 digits.", () => {
    assert.isTrue(lengthIsEqualTo10(phoneNumber));
  });
});

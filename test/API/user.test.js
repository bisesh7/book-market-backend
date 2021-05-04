const expect = require("chai").expect;
const User = require("../../models/User");
const emailValidation = require("../../utils/emailValidation");
const passwordValidation = require("../../utils/passwordValidation");
const phoneNumberValidation = require("../../utils/phoneNumberValidation");

describe("New user creation.", () => {
  it("should be invalid: email, password, phoneNumber is empty", (done) => {
    var newUser = new User();

    newUser.validate((err) => {
      expect(err.errors.email).to.exist;
      expect(err.errors.password).to.exist;
      expect(err.errors.phoneNumber).to.exist;
      done();
    });
  });

  it("should be valid: email, password, phoneNumber is given", (done) => {
    var newUser = new User({
      email: "bisesh.shakya@gmail.com",
      password: "bisesh12!",
      phoneNumber: "9887055069",
    });

    newUser.validate((err) => {
      expect(err).to.be.null;
      done();
    });
  });
});

describe("Email validation", () => {
  it("should be valid: bisesh.shakya@gmail.com", (done) => {
    expect(emailValidation("bisesh.shakya@gmail.com").success).to.be.true;
    done();
  });
  it("should not be valid: no email passed", (done) => {
    expect(emailValidation().success).to.be.false;
    done();
  });
  it("should not be valid: bisesh.gmail.com", (done) => {
    expect(emailValidation("bisesh.gmail.com").success).to.be.false;
    done();
  });
});

describe("Password validation", () => {
  it("should return object", (done) => {
    expect(passwordValidation("Bisesh12!")).to.be.an("object");
    done();
  });
  it("should return object with properties success and msg but not err if error doesn't occur", (done) => {
    expect(passwordValidation("Bisesh12!")).to.have.property("success");
    expect(passwordValidation("Bisesh12!")).to.have.property("msg");
    expect(passwordValidation("Bisesh12!")).to.not.have.property("err");
    done();
  });
  it("should return object with properties success, msg and err if error occurs", (done) => {
    expect(passwordValidation("")).to.have.property("success");
    expect(passwordValidation("")).to.have.property("msg");
    expect(passwordValidation("")).to.have.property("err");
    done();
  });
  it("should be valid: Bisesh12!", (done) => {
    expect(passwordValidation("Bisesh12!").success).to.be.true;
    expect(passwordValidation("12biseSh!").success).to.be.true;
    done();
  });
  it("should not be valid: no password passed", (done) => {
    expect(passwordValidation().success).to.be.false;
    done();
  });
  it("should not be valid: bisesh12!", (done) => {
    expect(passwordValidation("bisesh12!").success).to.be.false;
    done();
  });
});

describe("Phone Number validation", () => {
  it("should be valid: 9840234567", (done) => {
    expect(phoneNumberValidation("9840234567").success).to.be.true;
    done();
  });
  it("should not be valid: no password passed", (done) => {
    expect(phoneNumberValidation().success).to.be.false;
    done();
  });
  it("should not be valid: bisesh12!", (done) => {
    expect(phoneNumberValidation("bisesh12!").success).to.be.false;
    done();
  });
});

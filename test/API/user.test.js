const expect = require("chai").expect;
const User = require("../../models/User");

describe("New user creation.", function () {
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

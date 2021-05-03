const bcrypt = require("bcryptjs");

const getHash = (password) => {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

module.exports = getHash;

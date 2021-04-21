const config = require("config");

module.exports = function (req, res, next) {
  const API_KEY = req.headers.authorization;

  if (API_KEY !== config.get("API_KEY")) {
    return res.status(403).json({ success: false, msg: "Unauthorized access" });
  }

  next();
};

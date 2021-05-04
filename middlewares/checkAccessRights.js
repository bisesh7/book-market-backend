const jwt = require("jsonwebtoken");
const config = require("config");
const {
  tokenExpiredError,
  invalidTokenError,
  tokenError,
} = require("../utils/errors");

exports.checkAccessRights = (req, res, next) => {
  let accessToken = req.cookies["x-auth-token"];

  if (!accessToken) {
    return res
      .status(401)
      .json({
        success: false,
        msg: "Access denied, token missing!",
        err: tokenError,
      });
  }
  accessToken = accessToken.split(" ");
  try {
    const payLoad = jwt.verify(
      accessToken[1],
      config.get("ACCESS_TOKEN_SECRET")
    );
    req.user = payLoad.user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({
        success: false,
        msg: "Session expired, please login again.",
        err: tokenExpiredError,
      });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        msg: "Invalid token, please login again.",
        err: invalidTokenError,
      });
    } else {
      console.log(err);
      return res.status(400).json({ success: false, msg: err });
    }
  }
};

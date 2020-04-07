const config = require("../config/config");
const HttpStatus = require("web-status-codes");
const jwt = require("jsonwebtoken");

function verify_admin(req, res, next) {
  let token = req.headers.token;

  jwt.verify(token, config.JWT_KEY, (err, decoded) => {
    if (err || decoded.role != "admin") {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        ok: false,
        err
      });
    } else {
      next();
    }
  });
}

function verify_user(req, res, next) {
  let token = req.headers.token;

  jwt.verify(token, config.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        ok: false,
        err
      });
    } else {
      next();
    }
  });
}

function generate_token(user) {
  let token_payload = {
    id: user.id,
    role: user.role
  };

  return jwt.sign(token_payload, config.JWT_KEY, {
    expiresIn: config.TOKEN_EXP_TIME
  });
}

module.exports = { verify_admin, verify_user, generate_token };

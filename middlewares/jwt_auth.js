const config = require("../config/config");
const HttpStatus = require("web-status-codes");
const jwt = require("jsonwebtoken");

function verify_admin(req, res, next) {
  let token = req.headers.token;

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    console.log(decoded);
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

function generate_token(user) {
  let token_payload = {
    id: user.id,
    role: user.role
  };

  return jwt.sign(token_payload, process.env.JWT_KEY, {
    expiresIn: config.token_exp_time
  });
}

module.exports = { verify_admin, generate_token };

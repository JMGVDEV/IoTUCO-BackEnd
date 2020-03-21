const config = require("../config/config");
const HttpStatus = require("web-status-codes");
const jwt = require("jsonwebtoken");

function verify_token(req, res, next) {
  let token = req.get("token");

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      console.log(err);

      return res.status(HttpStatus.UNAUTHORIZED).json({
        ok: false,
        err
      });
    }
  
    req.body.token_payload= decoded.data;
    next();
  });
}

function generate_token(user) {
  let token_payload = {
    name : user.name,
    last_name : user.last_name,
  };

  return jwt.sign({ data: token_payload }, process.env.JWT_KEY, {
    expiresIn: config.token_exp_time
  });

}

module.exports = { verify_token, generate_token };
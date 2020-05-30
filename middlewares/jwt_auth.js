const config = require('../config/config');
const HttpStatus = require('web-status-codes');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const User = require('../models/user');

function verify_admin(req, res, next) {
  let token = req.headers.token;

  jwt.verify(token, config.JWT_KEY, (err, decoded) => {
    if (err || decoded.role != 'admin') {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        ok: false,
        err,
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
        err,
      });
    } else {
      next();
    }
  });
}

function generate_token(user) {
  let token_payload = {
    id: user.id,
    role: user.role,
  };

  return jwt.sign(token_payload, config.JWT_KEY, {
    expiresIn: config.TOKEN_EXP_TIME,
  });
}

const verifyTotp = async (req, res, next) => {
  let token = req.headers.token;
  let totpCode = req.headers.totp_code || '';
  console.log(totpCode);
  let decoded;

  try {
    decoded = await jwt.verify(token, config.JWT_KEY);
  } catch (error) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      ok: false,
      error,
    });
  }

  let user;
  try {
    user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error('User does not exists');
    }
  } catch (error) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      ok: false,
      error,
    });
  }

  var verified = speakeasy.totp.verify({
    secret: user.two_factor_secret,
    encoding: 'base32',
    token: totpCode,
  });

  console.log(
    speakeasy.totp({
      secret: user.two_factor_secret,
      encoding: 'base32',
    })
  );

  if (decoded.role == 'viewer' && verified) {
    next();
  } else {
    return res.status(HttpStatus.UNAUTHORIZED).json({ ok: false });
  }
};

module.exports = { verify_admin, verify_user, generate_token, verifyTotp };

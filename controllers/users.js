const config = require("../config/config");
var auth = require("../middlewares/jwt_auth");
const bcrypt = require("bcrypt");
const User = require("../models/user");

function create_user(body, admin=false) {
  return new Promise((resolve, reject) => {
    
    user = {
      name: body.name,
      last_name: body.last_name,
      email: body.email,
      admin: admin
    };

    const hash = bcrypt.hashSync(body.password, config.salt_rounds_bcrypt);
    user["password"] = hash;

    User.create(user)
      .then(user => {
        jwt = auth.generate_token(user);
        resolve({
          name: user.name,
          last_name: user.last_name,
          jwt
        });
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = { create_user };

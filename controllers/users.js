const config = require("../config/config");
var auth = require("../middlewares/jwt_auth");
const bcrypt = require("bcrypt");
const User = require("../models/user");

create_user = (body, admin = false) => {
  return new Promise((resolve, reject) => {
    user = {
      name: body.name,
      last_name: body.last_name,
      email: body.email,
      admin: admin
    };

    user["password"] = bcrypt.hashSync(
      body.password,
      config.salt_rounds_bcrypt
    );

    User.create(user)
      .then(user => {
        jwt = auth.generate_token(user);
        resolve({
          jwt
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

const auth_user = user_data => {
  return new Promise((resolve, reject) => {
    User.findOne({ where: { email: user_data.email } }).then(user => {
      if (user) {
        bcrypt
          .compare(user_data.password, user.password)
          .then(password_is_valid => {
            if (password_is_valid) {
              const jwt = auth.generate_token(user);
              resolve({
                jwt
              });
            }
            reject("Invalid password");
          });
      } else {
        reject("User doesn't exists");
      }
    });
  });
};

module.exports = { create_user, auth_user };

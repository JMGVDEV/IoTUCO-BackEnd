const config = require("../config/config");
var auth = require("../middlewares/jwt_auth");
const bcrypt = require("bcrypt");
const User = require("../models/user");

// To create or update admin user
//           WARNING
//password must be changed in production
User.upsert({
  name: "admin",
  last_name: "admin",
  email: "admin@iot.com",
  password: bcrypt.hashSync("admin", config.salt_rounds_bcrypt),
  role: "admin"
});

create_user = user_data => {
  return new Promise((resolve, reject) => {
    user = {
      name: user_data.name,
      last_name: user_data.last_name,
      email: user_data.email,
      role: user_data.role
    };

    user["password"] = bcrypt.hashSync(
      user_data.password,
      config.salt_rounds_bcrypt
    );

    User.create(user)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};

get_all_users = () => {
  return new Promise((resolve, reject) => {
    User.findAll({ attributes: ["id", "name", "last_name", "email", "role"] })
      .then(users => {
        resolve(users);
      })
      .catch(err => {
        reject(err);
      });
  });
};

delete_user = user_data => {
  user_id = user_data.id;
  return new Promise((resolve, reject) => {
    User.destroy({ where: { id: user_id } })
      .then(() => resolve())
      .catch(err => reject(err));
  });
};

update_user = (user_data_updated, id) => {
  return new Promise((resolve, reject) => {
    User.findByPk(id)
      .then(user => {
        user.name = user_data_updated.name || user.name;
        user.last_name = user_data_updated.last_name || user.name;
        user.emaile = user_data_updated.email || user.email;
        user.role = user_data_updated.role || user.role;

        user
          .save()
          .then(() => {
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

login_user = user_data => {
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

module.exports = {
  create_user,
  get_all_users,
  update_user,
  delete_user,
  login_user
};

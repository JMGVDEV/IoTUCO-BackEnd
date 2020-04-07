const config = require("../config/config");
var auth = require("../middlewares/jwt_auth");
const bcrypt = require("bcrypt");
const User = require("../models/user");

sync_users = async () => {
  console.log("Trying to create admin user");
  await User.sync();

  User.upsert({
    name: config.ADMIN_NAME,
    email: config.ADMIN_EMAIL,
    password: bcrypt.hashSync(config.ADMIN_PASSWORD, config.SALT_ROUNDS),
    role: "admin"
  })
    .then(admin => {
      console.log("Admin updated: " + admin);
    })
    .catch(err => {
      console.log("failed to create admin: " + err);
    });
};

create_user = user_data => {
  console.log("Trying to create user");
  return new Promise((resolve, reject) => {
    user = {
      name: user_data.name,
      last_name: user_data.last_name,
      email: user_data.email,
      role: user_data.role
    };

    user["password"] = bcrypt.hashSync(user_data.password, config.SALT_ROUNDS);

    User.create(user)
      .then(user => {
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
  console.log("trying to update user");
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
                name: user.name,
                last_name: user.last_name,
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
  login_user,
  sync_users
};

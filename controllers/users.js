const config = require("../config/config");
var auth = require("../middlewares/jwt_auth");
const bcrypt = require("bcrypt");
const user = require("../models/user");

function create_user(body) {
  return new Promise((resolve, reject) => {
    user = {
      name: body.name,
      last_name: body.last_name,
      email: body.email,
      cc: body.cc
    };

    bcrypt
      .hash(body.password, config.salt_rounds_bcrypt)
      .then(hash => {
        user["password"] = hash;
        jwt = auth.generate_token(user);

        user.create({
          nombre: request.body.nombre,
          cedula: request.body.cedula,
          rol: request.body.rol,
          contrasena: request.body.contrasena,
          token: request.body.token
      }).then(function (user) {
          if (user) {
              response.send(user);
          } else {
              response.status(400).send('Error in insert new user');
          }
      });

        resolve({
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          jwt
        });
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = { create_user };

const sequelize = require("../databases/connection_psql");
const types = require("sequelize").DataTypes;

const User = sequelize.define("usuarios", {
  name: { type: types.STRING, allowNull: false },
  last_name: types.STRING,
  email: {
    type: types.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  admin: { type: types.BOOLEAN, defaultValue: false },
  password: { type: types.STRING, allowNull: false }
});

module.exports = User;
 
const sequelize = require('../databases/connection_psql');
const types = require('sequelize').DataTypes;

const User = sequelize.define('usuarios', {
  name: { type: types.STRING, allowNull: false },
  last_name: { type: types.STRING },
  email: {
    type: types.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  role: { type: types.ENUM('admin', 'viewer'), allowNull: false },
  password: { type: types.STRING, allowNull: false },
  two_factor_secret: { type: types.STRING },
});

module.exports = User;

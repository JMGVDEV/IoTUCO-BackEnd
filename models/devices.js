const sequelize = require("../databases/connection_psql");
const types = require("sequelize").DataTypes;

const Device = sequelize.define("dispositivos", {
  growbed: { type: types.INTEGER, allowNull: false, unique: true },
  greenhouse: { type: types.INTEGER, allowNull: false },
  zone: { type: types.INTEGER, allowNull: false },
});

module.exports = Device;

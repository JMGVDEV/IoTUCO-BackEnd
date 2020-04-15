const sequelize = require("../databases/connection_psql");
const types = require("sequelize").DataTypes;

const Device = sequelize.define("dispositivos", {
  device_id: {
    type: types.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  zone: { type: types.INTEGER, allowNull: false },
  greenhouse: { type: types.INTEGER, allowNull: false },
  growbed: { type: types.INTEGER, allowNull: true },
});

module.exports = Device;

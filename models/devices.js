const sequelize = require("../databases/connection_psql");
const types = require("sequelize").DataTypes;

const Device = sequelize.define("dispositivos", {
  device_id: { type: types.STRING, allowNull: false, unique: true },
  zone: { type: types.INTEGER, allowNull: false },
  green_house: { type: types.INTEGER, allowNull: false },
  grow_bed: { type: types.INTEGER, allowNull: true }
});

module.exports = Device;

const sequelize = require('../databases/connection_psql');
const types = require('sequelize').DataTypes;

const Disease = sequelize.define('enfermedades', {
  name: { type: types.STRING, unique: true, allowNull: false },
  description: { type: types.STRING },
});

Disease.sync({ alter: true });

module.exports = Disease;

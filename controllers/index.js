const Users = require('./users');
const Devices = require('./devices');
const sequelize = require('../databases/connection_psql');

sync_models = async () => {
  await sequelize.sync({ force: false });
  Users.sync_users();
};

module.exports = {
  sync_models,
  Users,
  Devices,
};

const Users = require('./users');
const Devices = require('./devices');

sync_models = () => {
  Users.sync_users();
  Devices.sync_devices();
};

module.exports = {
  sync_models,
  Users,
  Devices,
};

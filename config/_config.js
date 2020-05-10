//-------------------------------------------------------------
//                   PROJECT CONFIGURATIONS
//
//         Set the project configurations, and then
//               rename this file to config.js
//-------------------------------------------------------------

const config = {
  // Server config
  PORT: x,
  IP: 'x',

  // Databases config

  //Postgres
  PSQL_IP: 'x',
  PSQL_PORT: x,
  PSQL_USER: 'x',
  PSQL_PASSWORD: 'x',
  PSQL_DATABASE: 'x',

  //Mongo
  MONGO_IP: 'x',
  MONGO_PORT: x,
  MONGO_DATABASE: 'x',

  // Mqtt config
  MQTT_CONF: {
    host: 'x',
    port: x,
    username: 'x',
    password: 'x',
  },

  // Initial user config
  ADMIN_NAME: 'x',
  ADMIN_EMAIL: 'x',
  ADMIN_PASSWORD: 'x',

  // Security Config
  JWT_KEY: 'x',
  SALT_ROUNDS: x,
  TOKEN_EXP_TIME: 'x',
};

module.exports = config;
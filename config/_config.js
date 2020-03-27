//-------------------------------------------------------------
//                   PROJECT CONFIGURATIONS
//
//         Set the project configurations, and then
//               rename this file to config.js
//-------------------------------------------------------------

config = {
  // Server config
  PORT: xxxx,
  IP: "xxx.xxx.xxx.xxx",

  // Databases config
  PSQL_USER: "xxxx",
  PSQL_PASSWORD: "xxxx",
  DATABASE: "xxxx",
  MONGO_DATABASE: "xxxx",

  // Mqtt config
  MQTT_BROKER_URL: "xxxx",
  MQTT_BROKER_USER: "xxxx",
  MQTT_BROKER_PASSWORD: "xxxx",
  MQTT_BROKER_PORT: xxxx,

  // Initial user config
  ADMIN_NAME: "xxxx",
  ADMIN_EMAIL: "xxxx",
  ADMIN_PASSWORD: "xxxx",

  // Security Config
  JWT_KEY: "xxxx",
  SALT_ROUNDS: 10,
  TOKEN_EXO_TIME: "x days"
};

module.exports = config;

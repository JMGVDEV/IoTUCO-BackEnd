//-------------------------------------------------------------
//                   PROJECT CONFIGURATIONS
//
//         Set the project configurations, and then
//               rename this file to config.js
//-------------------------------------------------------------

const config = {
  // Server config
  PORT: xxxx,
  IP: "xxx.xxx.xxx.xxx",

  // Databases config
  PSQL_IP: 'xxxx.xxxx.xxxx.xxxx',
  PSQL_PORT: xxxx,
  PSQL_USER: "xxxx",
  PSQL_PASSWORD: "xxxx",
  PSQL_DATABASE: "xxxx",
  MONGO_DATABASE: "xxxx",

  // Mqtt config
  MQTT_CONF: {
    host: "mqtt://xxx.xxx.xxx.xxx",
    port: xxxxx,
    username: "xxxx",
    password: "xxxx",
  },

  // Initial user config
  ADMIN_NAME: "xxxx",
  ADMIN_EMAIL: "xxxx",
  ADMIN_PASSWORD: "xxxx",

  // Security Config
  JWT_KEY: "xxxx",
  SALT_ROUNDS: xx,
  TOKEN_EXP_TIME: "xx days",
};

module.exports = config;

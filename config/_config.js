//-------------------------------------------------------------
//                   PROJECT CONFIGURATIONS
//
//         Set the project configurations, and then
//               rename this file to config.js
//-------------------------------------------------------------

process.env.PORT = process.env.PORT || xxxx;
process.env.IP = process.env.IP || "xxx.xxx.xxx.xxx";
process.env.JWT_KEY = process.env.JWT_KEY || "xxxx";

process.env.PSQL_USER = process.env.PSQL_USER || "xxxx";
process.env.PSQL_PASSWORD = process.env.PSQL_PASSWORD || "xxxx";
process.env.DATABASE = process.env.DATABASE || "xxxx";

process.env.MONGO_DATABASE = process.env.MONGO_DATABASE || "xxxx";

process.env.MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "xxxx";
process.env.MQTT_BROKER_USER = process.env.MQTT_BROKER_USER || "xxxx";
process.env.MQTT_BROKER_PASSWORD = process.env.MQTT_BROKER_PASSWORD || "xxxx";
process.env.MQTT_BROKER_PORT = process.env.MQTT_BROKER_PORT || xxxx;

module.exports = {
  salt_rounds_bcrypt: 10,
  token_exp_time: "15 days"
};

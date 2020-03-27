// Configurations for api server
process.env.PORT = process.env.PORT || 3000;
process.env.IP = process.env.IP || "127.0.0.1";
process.env.JWT_KEY = process.env.JWT_KEY || "JWT_KEY";

process.env.PSQL_USER = process.env.PSQL_USER || "user_iot";
process.env.PSQL_PASSWORD = process.env.PSQL_PASSWORD || "96043017605";
process.env.DATABASE = process.env.DATABASE || "IOT_UCO";

process.env.MONGO_DATABASE = process.env.MONGO_DATABASE || "IOT_UCO";

process.env.MQTT_BROKER_URL =
  process.env.MQTT_BROKER_URL || "mqtt://m16.cloudmqtt.com";
process.env.MQTT_BROKER_USER = process.env.MQTT_BROKER_USER || "tnoohysg";
process.env.MQTT_BROKER_PASSWORD =
  process.env.MQTT_BROKER_PASSWORD || "mA-_pD67H39I";
process.env.MQTT_BROKER_PORT = process.env.MQTT_BROKER_PORT || 13769;

module.exports = {
  salt_rounds_bcrypt: 10,
  token_exp_time: "15 days"
};

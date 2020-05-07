const config = require("../../config/config");
var mqtt = require("mqtt");

var access_client = mqtt.connect(config.MQTT_CONF.host, config.MQTT_CONF);

access_client.on("connect", () => {
  access_client.subscribe("access", (err, success) => {
    if (success) {
      console.log("Acces mqtt client connected");
    } else {
      console.log("Acces mqtt client not connected");
    }
  });
});

access_client.on("message", function (topic, message) {
  console.log(JSON.parse(message.toString()));
  access_client.end;
});

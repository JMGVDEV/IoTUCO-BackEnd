const config = require("../../config/config");
var mqtt = require("mqtt");

var greenhouse_client = mqtt.connect(config.MQTT_CONF.host, config.MQTT_CONF);

greenhouse_client.on("connect", () => {
  greenhouse_client.subscribe(
    "medicion/zona/+/invernadero/+/ambiente",
    (err, success) => {
      if (success) {
        console.log("Green house mqtt client connected");
      } else {
        console.log("Green house mqtt client not connected");
      }
    }
  );
});

/*---------------------------------------------------------------
 *     CALL HERE FUNCTION TO SAVE GREEN HOUSE ENVIRONMENT
 *---------------------------------------------------------------*/
greenhouse_client.on("message", function (topic, message) {
  greenhouse_client.end;
});

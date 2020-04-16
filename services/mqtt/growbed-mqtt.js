const config = require("../../config/config");
var mqtt = require("mqtt");
var environment = require("../../controllers/growbed_environment");

/*---------------------------------------------------------------------
 *
 *               GROW BEDS ENVIRONMENT HANDLE FUNCTIONS
 *
 *----------------------------------------------------------------------*/

var growbed_client = mqtt.connect(config.MQTT_CONF.host, config.MQTT_CONF);

growbed_client.on("connect", () => {
  growbed_client.subscribe(
    "medicion/zona/+/invernadero/+/cama/+/ambiente",
    (err, success) => {
      if (success) {
        console.log("Grow bed mqtt client connected");
      } else {
        console.log("Grow bed mqtt client not connected");
      }
    }
  );
});

growbed_client.on("message", function (topic, message) {
  let growbed_data = message.toString();
  environment.save_growbed_environment_registre(growbed_data);
  growbed_client.end;
});

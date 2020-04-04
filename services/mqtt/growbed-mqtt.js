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
  console.log(message.toString());
  environment.save_grow_bed_environment_registre(message.toString());
  growbed_client.end;
});

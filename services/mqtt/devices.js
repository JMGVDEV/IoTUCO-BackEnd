const config = require("../../config/config");
var mqtt = require("mqtt");
var devices = require("../../controllers/devices");

/*---------------------------------------------------------------------
 *
 *               DEVICES HANDLE FUNCTIONS
 *
 *----------------------------------------------------------------------*/

var devices_client = mqtt.connect(config.MQTT_CONF.host, config.MQTT_CONF);

devices_client.on("connect", () => {
  devices_client.subscribe(
    "zona/+/invernadero/+/cama/+/alive",
    (err, success) => {
      if (success) {
        console.log("Devices mqtt client connected");
      } else {
        console.log("Devides mqtt client not connected");
      }
    }
  );
});

devices_client.on("message", function (topic, message) {
  let device_message = JSON.parse(message.toString());
  devices.add_device(device_message);
});

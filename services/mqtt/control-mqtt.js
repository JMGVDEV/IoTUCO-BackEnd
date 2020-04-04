const config = require("../../config/config");
var mqtt = require("mqtt");
/*---------------------------------------------------------------------
 *
 *             PERIPHERALS CONTROL HANDLE FUNCTIONS
 *
 *----------------------------------------------------------------------*/

var control_client = mqtt.connect(config.MQTT_CONF.host, config.MQTT_CONF);

function publish_growbed(peripheral, value, zone, greenhouse, growbed) {
  let topic = `control/zona/${zone}/invernadero/${greenhouse}/cama/${growbed}`;
  let payload = `{peripheral:${peripheral},value:${value}}`;
  console.log("Publish: " + topic);
  control_client.publish(topic, payload);
}

function publish_greenhouse(peripheral, value, zone, greenhouse) {
  let topic = `control/zona/${zone}/invernadero/${greenhouse}`;
  let payload = `{peripheral:${peripheral},value:${value}}`;
  control_client.publish(topic, payload);
}

module.exports = { publish_growbed, publish_greenhouse };

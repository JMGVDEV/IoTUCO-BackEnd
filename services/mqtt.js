const config = require("../config/config");
var mqtt = require("mqtt");
var environment = require("../controllers/environment");

var growbed_client = mqtt.connect(config.MQTT_CONF.host, config.MQTT_CONF);
var greenroom_client = mqtt.connect(config.MQTT_CONF.host, config.MQTT_CONF);
var access_client = mqtt.connect(config.MQTT_CONF.host, config.MQTT_CONF);

growbed_client.on("connect", function growbed_message() {
  growbed_client.subscribe(
    "medicion/zona/+/invernadero/+/cama/+/ambiente",
    function(err) {
      console.log("Grow bed mqtt client connected");
    }
  );
});

growbed_client.on("message", function(topic, message) {
  console.log(message.toString());
  environment.save_grow_bed_environment_registre(message.toString());
  growbed_client.end;
});

greenroom_client.on("connect", function() {
  greenroom_client.subscribe("medicion/zona/+/invernadero/+/ambiente", function(
    err
  ) {
    console.log("Green room mqtt client connected");
  });
});
greenroom_client.on("message", function(topic, message) {
  //console.log(message.toString());
  greenroom_client.end;
});

access_client.on("connect", function() {
  access_client.subscribe("medicion/zona/+/invernadero/+/ingresos", function(
    err
  ) {
    console.log("Access mqtt client connected");
  });
});

access_client.on("message", function(topic, message) {
  //console.log(message.toString());
  access_client.end;
});

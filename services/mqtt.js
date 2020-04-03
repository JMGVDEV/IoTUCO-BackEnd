const config = require("../config/config");
var mqtt = require("mqtt");
var environment = require("../controllers/environment");

var growbed_client = mqtt.connect(config.MQTT_CONF.host, config.MQTT_CONF);
var greenroom_client = mqtt.connect(config.MQTT_CONF.host, config.MQTT_CONF);
var access_client = mqtt.connect(config.MQTT_CONF.host, config.MQTT_CONF);
var control_client = mqtt.connect(config.MQTT_CONF.host, config.MQTT_CONF);

// -------------------------------------------------------------------------
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

growbed_client.on("message", function(topic, message) {
  console.log(message.toString());
  environment.save_grow_bed_environment_registre(message.toString());
  growbed_client.end;
});

// -------------------------------------------------------------------------
greenroom_client.on("connect", () => {
  greenroom_client.subscribe(
    "medicion/zona/+/invernadero/+/ambiente",
    (err, success) => {
      if (success) {
        console.log("Green room mqtt client connected");
      } else {
        console.log("Green room mqtt client not connected");
      }
    }
  );
});
greenroom_client.on("message", function(topic, message) {
  //console.log(message.toString());
  greenroom_client.end;
});
// -------------------------------------------------------------------------
access_client.on("connect", () => {
  access_client.subscribe("medicion", (err, success) => {
    if (success) {
      console.log("Acces mqtt client connected");
    } else {
      console.log("Acces mqtt client not connected");
    }
  });
});

access_client.on("message", function(topic, message) {
  //console.log(message.toString());
  access_client.end;
});

function publish_growbed(peripheral, value, zone, greenroom, growbed){
    control_client.publish('medicion/zona/${zone}/invernadero/${greenroom}/cama/${growbed}/ambiente','{peripheral:${peripheral},value:${value}}')
}

function publish_greenroom(peripheral, value, zone, greenroom){
    control_client.publish('medicion/zona/${zone}/invernadero/${greenroom}','{peripheral:${peripheral},value:${value}}')
}
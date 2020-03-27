var mqtt = require("mqtt");
var environment = require("../controllers/environment");

var MQTT_CONF = {
  port: process.env.MQTT_BROKER_PORT,
  username: process.env.MQTT_BROKER_USER,
  password: process.env.MQTT_BROKER_PASSWORD
};

var growbed_client = mqtt.connect(process.env.MQTT_BROKER_URL, MQTT_CONF);
var greenroom_client = mqtt.connect(process.env.MQTT_BROKER_URL, MQTT_CONF);
var access_client = mqtt.connect(process.env.MQTT_BROKER_URL, MQTT_CONF);

growbed_client.on("connect", function growbed_message() {
  growbed_client.subscribe(
    "medicion/zona/+/invernadero/+/cama/+/ambiente",
    function(err) {
      console.log(
        "Subscrito al tópico correctamente medicion/zona/x/invernadero/y/cama/z/ambiente."
      );
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
    console.log(
      "Subscrito al tópico correctamente medicion/zona/x/invernadero/y/ambiente."
    );
  });
});
greenroom_client.on("message", function(topic, message) {
  console.log(message.toString());
  greenroom_client.end;
});

access_client.on("connect", function() {
  access_client.subscribe("medicion/zona/+/invernadero/+/ingresos", function(
    err
  ) {
    console.log(
      "Subscrito al tópico correctamente medicion/zona/x/invernadero/y/ingresos."
    );
  });
});
access_client.on("message", function(topic, message) {
  console.log(message.toString());
  access_client.end;
});

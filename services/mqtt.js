var mqtt = require('mqtt');
var environment = require('../controllers/environment')

var growbed_client = mqtt.connect('mqtt://192.168.1.3')
var greenroom_client = mqtt.connect('mqtt://192.168.1.3')
var access_client = mqtt.connect('mqtt://192.168.1.3')

growbed_client.on('connect', function growbed_message() {
    growbed_client.subscribe('medicion/zona/x/invernadero/y/cama/z/ambiente', function (err) {
        console.log("Subscrito al tópico correctamente medicion/zona/x/invernadero/y/cama/z/ambiente.")
    })
})
growbed_client.on('message', function (topic, message) {
    console.log(message.toString());
    environment.save_grow_bed_environment_registre(message.toString());
    client_growbed.end
})

greenroom_client.on('connect', function () {
    greenroom_client.subscribe('medicion/zona/x/invernadero/y/ambiente', function (err) {
        console.log("Subscrito al tópico correctamente medicion/zona/x/invernadero/y/ambiente.")
    })
})
greenroom_client.on('message', function (topic, message) {
    console.log(message.toString())
    greenroom.end
})

access_client.on('connect', function () {
    access_client.subscribe('medicion/zona/x/invernadero/y/ingresos', function (err) {
        console.log("Subscrito al tópico correctamente medicion/zona/x/invernadero/y/ingresos.")
    })
})
access_client.on('message', function (topic, message) {
    console.log(message.toString())
    greenroom.end
})



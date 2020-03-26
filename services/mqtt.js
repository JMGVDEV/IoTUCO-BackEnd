var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.1.3')

client.on('connect', function () {
    client.subscribe('prueba/mqtt/javascript', function (err) {
        if (!err) {
            client.publish('prueba/mqtt/javascript', 'Hello mqtt')
        }
    })
})

client.on('message', function (topic, message) {
    console.log(message.toString())
    client.end
})




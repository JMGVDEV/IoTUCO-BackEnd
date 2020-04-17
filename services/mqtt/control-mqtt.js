const config = require("../../config/config");
var mqtt = require("mqtt");
var schedule = require("node-schedule-tz");
var peripherals = require("../../Utils/peripherals");

/*---------------------------------------------------------------------
 *
 *             PERIPHERALS CONTROL HANDLE FUNCTIONS
 *
 *----------------------------------------------------------------------*/

var lights_jobs = [];

var control_client = mqtt.connect(config.MQTT_CONF.host, config.MQTT_CONF);

function publish_growbed(peripheral, value, zone, greenhouse, growbed) {
  let topic = `control/zona/${zone}/invernadero/${greenhouse}/cama/${growbed}`;
  let payload = `{peripheral:${peripheral},value:${value}}`;
  console.log("Publish: " + topic);
  control_client.publish(topic, payload);
}

function program_lights(data) {
  lights_jobs.forEach((job) => job.cancel());

  let [hour_init, minute_init, second_init] = data.time_init.split(":");
  let [hour_end, minute_end, second_end] = data.time_end.split(":");

  let rule_init = new schedule.RecurrenceRule();
  let rule_end = new schedule.RecurrenceRule();

  rule_init.hour = hour_init;
  rule_init.minute = minute_init;
  rule_init.second = second_init;
  rule_init.tz = "America/Bogota";

  rule_end.hour = hour_end;
  rule_end.minute = minute_end;
  rule_end.second = second_end;
  rule_end.tz = "America/Bogota";

  let init_job = schedule.scheduleJob(rule_init, () => {
    console.log("Turn lights on: " + data.growbed);
    publish_growbed(
      peripherals.LIGHT,
      data.value,
      data.zone,
      data.greenhouse,
      data.growbed
    );
  });

  let end_job = schedule.scheduleJob(rule_end, () => {
    console.log("Turn lights off: " + data.growbed);
    publish_growbed(
      peripherals.LIGHT,
      0,
      data.zone,
      data.greenhouse,
      data.growbed
    );
  });

  lights_jobs.growbed = [init_job, end_job];
}

function publish_greenhouse(peripheral, value, zone, greenhouse) {
  let topic = `control/zona/${zone}/invernadero/${greenhouse}`;
  let payload = `{peripheral:${peripheral},value:${value}}`;
  control_client.publish(topic, payload);
  console.log(topic, payload);
}

module.exports = { publish_growbed, publish_greenhouse, program_lights };

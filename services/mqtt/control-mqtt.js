const config = require('../../config/config');
var mqtt = require('mqtt');
var schedule = require('node-schedule');
var peripherals = require('../../Utils/peripherals');

const TIME_ZONE = 'America/Bogota';

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
  console.log('Publish: ' + topic);
  control_client.publish(topic, payload);
}

function publish_greenhouse(peripheral, value, zone, greenhouse) {
  let topic = `control/zona/${zone}/invernadero/${greenhouse}`;
  let payload = `{peripheral:${peripheral},value:${value}}`;
  control_client.publish(topic, payload);
  console.log(topic, payload);
}

function program_lights(data) {
  return new Promise((resolve, reject) => {
    let message_validation = message_is_ok(data);

    if (message_validation.status == false) {
      reject(message_validation.errors);
      return;
    } else {
      resolve();
    }

    lights_jobs.forEach((job) => job.cancel());

    let [hour_init, minute_init, second_init] = data.time_init.split(':');
    let [hour_end, minute_end, second_end] = data.time_end.split(':');

    let rule_init = new schedule.RecurrenceRule();
    let rule_end = new schedule.RecurrenceRule();

    rule_init.hour = hour_init;
    rule_init.minute = minute_init;
    rule_init.second = second_init;
    rule_init.tz = TIME_ZONE;

    rule_end.hour = hour_end;
    rule_end.minute = minute_end;
    rule_end.second = second_end;
    rule_end.tz = TIME_ZONE;

    let init_job = schedule.scheduleJob(rule_init, () => {
      console.log('Turn lights on: ' + data.growbed);
      publish_growbed(
        peripherals.LIGHT,
        data.value,
        data.zone,
        data.greenhouse,
        data.growbed
      );
    });

    let end_job = schedule.scheduleJob(rule_end, () => {
      console.log('Turn lights off: ' + data.growbed);
      publish_growbed(
        peripherals.LIGHT,
        0,
        data.zone,
        data.greenhouse,
        data.growbed
      );
    });
    lights_jobs.growbed = [init_job, end_job];
    console.log(
      `Lights will be programed between ${data.time_init} and ${data.time_end}`
    );
  });
}

function message_is_ok(data) {
  let errors = [];
  let { zone, value, growbed, greenhouse, time_init, time_end } = data;

  let time_regex = new RegExp(
    '^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]){1}$',
    'i'
  );

  isNaN(zone) || zone == null || zone == '' ? errors.push({ zone }) : null;
  isNaN(value) || value == null || value == '' ? errors.push({ value }) : null;
  isNaN(growbed) || growbed == null || growbed == ''
    ? errors.push({ growbed })
    : null;
  isNaN(greenhouse) || greenhouse == null || greenhouse == ''
    ? errors.push({ greenhouse })
    : null;

  !time_regex.test(time_init) ? errors.push({ time_init }) : null;
  !time_regex.test(time_end) ? errors.push({ time_end }) : null;

  return errors.length ? { status: false, errors } : { status: true };
}

module.exports = { publish_growbed, publish_greenhouse, program_lights };

var { growbed_environment } = require('../models/growbed_environment');

function convert_message_to_json(message) {
  let re = /["'\w]+:['"\w]+/g;
  let matches = [...message.matchAll(re)];
  let data = {};
  matches.forEach((values) => {
    tuple = values[0].split(':');
    data[tuple[0]] = tuple[1];
  });

  return data;
}

save_growbed_environment_registre = (growbed_data) => {
  growbed_data = JSON.parse(growbed_data);
  growbed_data.hour = new Date(); //growbed_data.hour * 1000; // For adjust time to local hour
  const new_growbed_environment = new growbed_environment(growbed_data);
  new_growbed_environment
    .save()
    .then(() => {
      console.log('Save enviroment success');
    })
    .catch((err) => {
      console.log('Error, could not save: ' + err);
    });
};

get_environment = (growbed_id) => {
  return new Promise((resolve, reject) => {
    let response = { growbed: growbed_id };

    growbed_environment
      .findOne({ growbed: growbed_id })
      .sort({ _id: -1 })
      .then((res) => {
        response['environment'] = {
          temperature: parseFloat(res.temperature),
          humidity: parseFloat(res.humidity),
        };
        resolve(response);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

module.exports = { save_growbed_environment_registre, get_environment };

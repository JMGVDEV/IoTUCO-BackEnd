var { growbed_environment } = require("../models/growbed_environment");

function convert_message_to_json(message) {
  let re = /["'\w]+:['"\w]+/g;
  let matches = [...message.matchAll(re)];
  let data = {};
  matches.forEach((values) => {
    tuple = values[0].split(":");
    data[tuple[0]] = tuple[1];
  });

  return data;
}

save_growbed_environment_registre = (message) => {
  const data = convert_message_to_json(message);

  const growbed_environment = new growbed_environment({
    data,
  });

  growbed_environment
    .save()
    .then(() => {
      console.log("Save enviroment sucess");
    })
    .catch((err) => {
      console.log("Error, could not save: " + err);
    });
};

module.exports = { save_growbed_environment_registre };

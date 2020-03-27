<<<<<<< HEAD
var { grow_bed_environment } = require("../models/enviroment");

function convert_message_to_json(message) {
  let re = /["'\w]+:['"\w]+/g;
  let matches = [...message.matchAll(re)];
  let json = {};
  matches.forEach(values => {
    tuple = values[0].split(":");
    json[tuple[0]] = tuple[1];
  });

  return json;
}

save_grow_bed_environment_registre = message => {
  let json = convert_message_to_json(message);
  console.log(json);
  var grow_bed_env_doc = new grow_bed_environment({
    json
  });

=======
var grow_bed_environment = require("../models/enviroment");

function convert_message_to_json(message){
  let re = /["'\w]+:['"\w]+/g
  let matches = [...message.matchAll(re)]
  let json = {}
  matches.forEach(values => {
  tuple = values[0].split(':')
  json[tuple[0]] = tuple[1]
  })

  return json
}

save_grow_bed_environment_registre = (message) => {
  let json = convert_message_to_json(message)
  console.log(json)
  var grow_bed_env_doc = new grow_bed_environment({
    json
  });

>>>>>>> bdb191c6c068c1aed7324dc50cd6ba7dfa4d472d
  grow_bed_env_doc
    .save()
    .then(() => {
      console.log("Save enviroment sucess");
    })
    .catch(err => {
      console.log("Error, could not save: " + err);
    });
};

<<<<<<< HEAD
module.exports = { save_grow_bed_environment_registre };
=======
module.exports = { save_grow_bed_environment_registre }
>>>>>>> bdb191c6c068c1aed7324dc50cd6ba7dfa4d472d

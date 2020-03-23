var environment = require("../models/enviroment");

save_environment_registre = () => {
  var env_doc = new environment({
    grow_bed: "cama1",
    temerature: 12.2333,
    humidity: 96.65
  });

  env_doc
    .save()
    .then(() => {
      console.log("Save enviroment sucess");
    })
    .catch(err => {
      console.log("Error, could not save: " + err);
    });
};

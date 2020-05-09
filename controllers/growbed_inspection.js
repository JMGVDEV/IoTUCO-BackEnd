const { growbed_inspection } = require('../models/growbed_inspection');

function save_growbed_inspection(inspection) {
  console.log(inspection);
  const new_growbed_inspection = new growbed_inspection(inspection);

  return new Promise((resolve, reject) => {
    new_growbed_inspection
      .save()
      .then(() => {
        console.log('growbed inspection saved success');
        resolve();
      })
      .catch((e) => {
        console.log('Fail to save growbed inspection: ' + e);
        reject(e);
      });
  });
}

module.exports = { save_growbed_inspection };

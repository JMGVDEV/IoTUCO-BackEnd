const { growbed_inspection } = require('../models/growbed_inspection');

function save_growbed_inspection(inspection) {
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

const get_inspection = (growbed_id) => {
  return growbed_inspection.findOne({ growbed: growbed_id }).sort({ hour: -1 });
};

module.exports = { save_growbed_inspection, get_inspection };

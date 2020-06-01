const Device = require('../models/devices');

add_device = (device_data) => {
  console.log('Trying to create device');

  Device.upsert(device_data)
    .then((device) => {
      console.log('Device created or updated: ' + device);
    })
    .catch((err) => {
      console.log('Failed to create device: ' + err);
    });
};

get_all_grow_beds = () => {
  return new Promise((resolve, reject) => {
    Device.findAll({
      raw: true,
      attributes: ['id', 'growbed', 'zone', 'greenhouse'],
    })
      .then((grow_beds) => {
        const grow_bed_list = grow_beds.filter((grow) => {
          return grow.growbed ? grow.growbed : undefined;
        });
        resolve(grow_bed_list);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

get_all_grow_houses = () => {
  return new Promise((resolve, reject) => {
    Device.findAll({
      raw: true,
      attributes: ['zone', 'greenhouse'],
    })
      .then((green_houses) => {
        green_house_list = green_houses.filter((obj, pos, arr) => {
          return (
            arr
              .map((mapObj) => mapObj['greenhouse'])
              .indexOf(obj['greenhouse']) === pos
          );
        });

        resolve(green_house_list);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  add_device,
  get_all_grow_beds,
  get_all_grow_houses,
};

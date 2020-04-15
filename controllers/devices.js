const Device = require("../models/devices");

sync_devices = async () => {
  await Device.sync();
};

add_device = (device_data) => {
  console.log("Trying to create device");

  const device = {
    device_id: device_data.id,
    zone: device_data.zona,
    green_house: device_data.invernadero,
    grow_bed: device_data.cama,
  };

  Device.upsert(device)
    .then((device) => {
      console.log("Device created or updated: " + device);
    })
    .catch((err) => {
      console.log("Failed to create device: " + err);
    });
};

get_all_grow_beds = () => {
  return new Promise((resolve, reject) => {
    Device.findAll({
      raw: true,
      attributes: ["grow_bed", "zone", "green_house"],
    })
      .then((grow_beds) => {
        const grow_bed_list = grow_beds.filter((grow) => {
          return grow.grow_bed ? grow.grow_bed : undefined;
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
      attributes: ["zone", "green_house"],
    })
      .then((green_houses) => {
        green_house_list = green_houses.filter((obj, pos, arr) => {
          return (
            arr
              .map((mapObj) => mapObj["green_house"])
              .indexOf(obj["green_house"]) === pos
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
  sync_devices,
  add_device,
  get_all_grow_beds,
  get_all_grow_houses,
};

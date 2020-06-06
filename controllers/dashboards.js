var { growbed_environment } = require('../models/growbed_environment');
var { growbed_inspection } = require('../models/growbed_inspection');

const getHistoricalEnvironmentVariables = async (greenhouse, growbed) => {
  const query = await growbed_environment
    .find({ growbed, greenhouse })
    .select({ temperature: 1, humidity: 1, hour: 1, _id: 0 })
    .lean();

  const data = {
    temperature: [],
    humidity: [],
    date: [],
  };

  query.forEach((document) => {
    if (document.temperature && document.humidity && document.hour) {
      data.temperature.push(parseFloat(document.temperature));
      data.humidity.push(parseFloat(document.humidity));
      data.date.push(document.hour);
    }
  });

  return data;
};

const getDiseases = async (greenhouse) => {
  let growbeds = await growbed_inspection
    .find({ greenhouse })
    .distinct('growbed');
  let diseases = [];

  for (const growbed of growbeds) {
    let document = await growbed_inspection
      .findOne({ growbed })
      .sort({ hour: -1 })
      .lean();

    if (document && document.pests) {
      diseases = [...diseases, ...document.pests];
    }
  }

  let countDiseases = {};
  diseases.forEach((disease) => {
    countDiseases[disease] = diseases.filter(
      (diseaseF) => diseaseF == disease
    ).length;
  });

  return countDiseases;
};

module.exports = { getHistoricalEnvironmentVariables, getDiseases };

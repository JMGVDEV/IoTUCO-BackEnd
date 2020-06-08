var { growbed_environment } = require('../models/growbed_environment');
var { growbed_inspection } = require('../models/growbed_inspection');
var { log_action } = require('../models/log_actions');

const getHistoricalEnvironmentVariables = async (greenhouse, growbed) => {
  const query = await growbed_environment
    .find({ growbed, greenhouse })
    .select({ temperature: 1, humidity: 1, hour: 1, _id: 0 })
    .lean();

  let temperature = [];
  let humidity = [];
  let date = [];

  query.forEach((document) => {
    if (document.temperature && document.humidity && document.hour) {
      temperature.push(parseFloat(document.temperature));
      humidity.push(parseFloat(document.humidity));
      date.push(document.hour);
    }
  });

  return {
    series: [
      {
        name: 'Temperature',
        data: temperature,
      },
      {
        name: 'Humedad',
        data: humidity,
      },
    ],
    date,
  };
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

  let labels = [];
  let series = [];

  diseases.forEach((disease) => {
    if (labels.indexOf(disease) === -1) {
      let count = diseases.filter((diseaseF) => diseaseF == disease).length;
      labels.push(disease);
      series.push(count);
    }
  });

  return { series, labels };
};

const getDegreesDay = async (greenhouse, growbed) => {
  const baseTemperature = 20;

  /*
   * Get unique dates where temperature is not null
   */
  let environment_dates = await growbed_environment
    .find({ greenhouse, temperature: { $ne: null } })
    .select({ hour: 1, _id: 0 })
    .distinct('hour');

  environment_dates = environment_dates.map((date) => {
    /*
     * Set time to midnoght
     */
    date.setHours(0, 0, 0, 0);
    return date;
  });

  let date = [];
  let degrees = [];

  for (let dateInit of environment_dates) {
    /*
     * Generate initial and final time
     */

    //let initDate =
    const dateEnd = new Date(dateInit);
    dateEnd.setHours(24, 0, 0, 0);

    /*
     * Find the last value
     */

    let minTemperature = await growbed_environment
      .findOne({
        growbed,
        greenhouse,
        hour: {
          $gte: dateInit,
          $lt: dateEnd,
        },
      })
      .select({ temperature: 1, _id: 0 })
      .sort({ temperature: 1 })
      .lean();

    /*
     * Find the first value
     */
    let maxTemperature = await growbed_environment
      .findOne({
        growbed,
        greenhouse,
        hour: {
          $gte: dateInit,
          $lt: dateEnd,
        },
      })
      .select({ temperature: 1, _id: 0 })
      .sort({ temperature: -1 })
      .lean();

    minTemperature = parseFloat(minTemperature.temperature);
    maxTemperature = parseFloat(maxTemperature.temperature);

    const DegreesDay = (maxTemperature + minTemperature) / 2 - baseTemperature;

    /*
     * Save data if not exists
     */
    if (date.indexOf(dateInit.toISOString()) == -1) {
      date.push(dateInit.toISOString());
      degrees.push(DegreesDay);
    }
  }

  return {
    date,
    degrees,
  };
};

const getEvents = async (greenhouse_id) => {
  /*
   * Get unique dates where temperature is not null
   */
  let eventDates = await log_action
    .find({ greenhouse_id })
    .select({ hour: 1, _id: 0 })
    .distinct('hour');

  eventDates = eventDates.map((date) => {
    /*
     * Set time to midnoght
     */
    date.setHours(0, 0, 0, 0);
    return date;
  });

  let date = [];
  let dataBlindsOpen = [];
  let dataBlindsClose = [];

  let dataLockOpen = [];
  let dataLockClose = [];

  let dataLigths = [];

  for (let initDate of eventDates) {
    const endDate = new Date(initDate);
    endDate.setHours(24, 0, 0, 0);

    /*
     * Find the number of actions for each day
     */
    const blindsCloseEventsCount = await getEvent(
      'BLINDS',
      initDate,
      endDate,
      (value = 0)
    );
    const blindsOpenEventsCount = await getEvent(
      'BLINDS',
      initDate,
      endDate,
      (value = 100)
    );

    const lockOpenEventsCount = await getEvent('LOCK', initDate, endDate, 100);
    const lockCloseEventsCount = await getEvent('LOCK', initDate, endDate, 0);

    const lightsEventsCount = await getEvent('LIGHTS', initDate, endDate, 100);

    if (date.indexOf(initDate.toISOString()) == -1) {
      date.push(initDate.toISOString());

      dataBlindsOpen.push(blindsOpenEventsCount);
      dataBlindsClose.push(blindsCloseEventsCount);
      dataLockOpen.push(lockOpenEventsCount);
      dataLockClose.push(lockCloseEventsCount);

      dataLigths.push(lightsEventsCount);
    }
  }

  return {
    series: [
      { name: 'Apertura de cortinas', data: dataBlindsOpen },
      { name: 'Cierre de cortinas', data: dataBlindsClose },
      { name: 'Apertura de puerta', data: dataLockOpen },
      { name: 'Cierre de puerta', data: dataLockClose },

      { name: 'Programación de luces', data: dataLigths },
    ],
    date,
  };
};

const getEvent = async (event, initDate, endDate, value) => {
  let events = await log_action
    .find({
      value,
      type: event,
      hour: {
        $gte: initDate,
        $lt: endDate,
      },
    })
    .countDocuments();

  return events;
};

module.exports = {
  getHistoricalEnvironmentVariables,
  getDiseases,
  getDegreesDay,
  getEvents,
};

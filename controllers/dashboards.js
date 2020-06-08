var { growbed_environment } = require('../models/growbed_environment');
var { growbed_inspection } = require('../models/growbed_inspection');
var { log_action } = require('../models/log_actions');

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
  console.log(eventDates);

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
      { name: 'BLINDS_OPEN', data: dataBlindsOpen },
      { name: 'BLINDS_CLOSE', data: dataBlindsClose },
      { name: 'LOCK_OPEN', data: dataLockOpen },
      { name: 'LOCK_CLOSE', data: dataLockClose },

      { name: 'LIGHTS', data: dataLigths },
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

const Disease = require('../models/diseases');

const getAllDiseases = () => {
  return Disease.findAll();
};

const createDisease = (disease) => {
  return Disease.create(disease);
};

module.exports = { getAllDiseases, createDisease };

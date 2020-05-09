const config = require('../config/config');
var mongoose = require('mongoose');

mongoose
  .connect(
    `mongodb://${config.MONGO_IP}:${config.MONGO_PORT}/${config.MONGO_DATABASE}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Mongo connected');
  })
  .catch((err) => {
    console.log('Mongo, fail to connect: ' + err);
  });

module.exports = { mongoose };

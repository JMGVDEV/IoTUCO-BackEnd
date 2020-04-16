var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const greenhouse_environment_schema = new Schema({
  temperature: Schema.Types.Decimal128,
  humidity: Schema.Types.Decimal128,
  zone: Schema.Types.Number,
  greenhouse: Schema.Types.Number,
  hour: Schema.Types.Date,
  device_id: Schema.Types.String,
});

var greenhouse_environment = mongoose.model(
  "environment_greenhouse",
  greenhouse_environment_schema
);

module.exports = { greenhouse_environment };

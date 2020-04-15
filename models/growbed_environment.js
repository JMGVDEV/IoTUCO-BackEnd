var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var growbed_environment_schema = new Schema({
  temperature: Schema.Types.Decimal128,
  humidity: Schema.Types.Decimal128,
  zone: Schema.Types.Number,
  greenhouse: Schema.Types.Number,
  hour: Schema.Types.Date,
  device_id: Schema.Types.String,
  growbed: Schema.Types.Number,
});

var growbed_environment = mongoose.model(
  "environment_growbed",
  growbed_environment_schema
);

module.exports = { growbed_environment };

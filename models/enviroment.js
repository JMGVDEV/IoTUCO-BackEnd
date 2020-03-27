var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var grow_bed_schema = new Schema({
  temperature: Schema.Types.Decimal128,
  humidity: Schema.Types.Decimal128,
  zone: Schema.Types.Number,
  greenhouse: Schema.Types.Number,
  hour: Schema.Types.Date,
  device_id: Schema.Types.String,
  gow_bed: Schema.Types.Number
});

var greenhouse_schema = new Schema({
  temperature: Schema.Types.Decimal128,
  humidity: Schema.Types.Decimal128,
  zone: Schema.Types.Number,
  greenhouse: Schema.Types.Number,
  hour: Schema.Types.Date,
  device_id: Schema.Types.String,
});

var access_schema = new Schema({
  action: Schema.Types.String,
  zone: Schema.Types.Number,
  greenhouse: Schema.Types.Number,
  hour: Schema.Types.Date,
  device_id: Schema.Types.String,
});

var grow_bed_environment = mongoose.model("environment", grow_bed_schema);

module.exports = {grow_bed_environment};


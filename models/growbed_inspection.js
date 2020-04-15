var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var growbed_inspection_schema = new Schema({
  zone: Schema.Types.Number,
  greenhouse: Schema.Types.Number,
  hour: Schema.Types.Date,
  growbed: Schema.Types.Number,
  pest: Schema.Types.String,
  observation: Schema.Types.String,
});

var growbed_inspection = mongoose.model(
  "growbed_inspection",
  growbed_inspection_schema
);

module.exports = { growbed_inspection };

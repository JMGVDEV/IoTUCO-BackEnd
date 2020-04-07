var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var access_schema = new Schema({
  action: Schema.Types.String,
  zone: Schema.Types.Number,
  greenhouse: Schema.Types.Number,
  hour: Schema.Types.Date,
  device_id: Schema.Types.String,
});

var access = mongoose.model("access_control", access_schema);

module.exports = { access };

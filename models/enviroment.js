var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var environment_schema = new Schema({
  grow_bed: Schema.Types.String,
  temerature: Schema.Types.Decimal128,
  humidity: Schema.Types.Decimal128
});

var environment = mongoose.model("environment", environment_schema);
module.exports = environment;

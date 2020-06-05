var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const log_action_schema = new Schema({
  type: Schema.Types.Number,
  hour: Schema.Types.Date,
  green_house_id: Schema.Types.Number,
  growbed_id: Schema.Types.Number,
});

var log_action = mongoose.model('log_action', log_action_schema);

module.exports = { log_action };

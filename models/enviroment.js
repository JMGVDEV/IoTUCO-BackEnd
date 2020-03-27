var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var grow_bed_schema = new Schema({
  temperature: Schema.Types.Decimal128,
  humidity: Schema.Types.Decimal128,
  zone: Schema.Types.Number,
  greenhouse: Schema.Types.Number,
  hour: Schema.Types.Date,
  device_id: Schema.Types.String,
<<<<<<< HEAD
  grow_bed: Schema.Types.Number
=======
  gow_bed: Schema.Types.Number
>>>>>>> bdb191c6c068c1aed7324dc50cd6ba7dfa4d472d
});

var greenhouse_schema = new Schema({
  temperature: Schema.Types.Decimal128,
  humidity: Schema.Types.Decimal128,
  zone: Schema.Types.Number,
  greenhouse: Schema.Types.Number,
  hour: Schema.Types.Date,
<<<<<<< HEAD
  device_id: Schema.Types.String
=======
  device_id: Schema.Types.String,
>>>>>>> bdb191c6c068c1aed7324dc50cd6ba7dfa4d472d
});

var access_schema = new Schema({
  action: Schema.Types.String,
  zone: Schema.Types.Number,
  greenhouse: Schema.Types.Number,
  hour: Schema.Types.Date,
<<<<<<< HEAD
  device_id: Schema.Types.String
=======
  device_id: Schema.Types.String,
>>>>>>> bdb191c6c068c1aed7324dc50cd6ba7dfa4d472d
});

var grow_bed_environment = mongoose.model("environment", grow_bed_schema);

<<<<<<< HEAD
module.exports = { grow_bed_environment };
=======
module.exports = {grow_bed_environment};

>>>>>>> bdb191c6c068c1aed7324dc50cd6ba7dfa4d472d

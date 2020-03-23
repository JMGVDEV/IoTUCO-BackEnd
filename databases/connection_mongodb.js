var mongoose = require("mongoose");

mongoose
  .connect(`mongodb://localhost:27017/${process.env.MONGO_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Mongo connected");
  })
  .catch(err => {
    console.log("Mongo, fail to connect: " + err);
  });

module.exports = { mongoose };

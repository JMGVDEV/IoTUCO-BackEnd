const config = require("./config/config");
const models = require("./controllers/index");
let bodyParser = require("body-parser");
let express = require("express");
let app = express();
require("./databases/connection_mongodb");
require("./databases/connection_psql");
require("./services/mqtt");

// For avoid cors errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, token, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("<h2>Server On</h2>");
});

app.use(require("./routes/index"));

app.set("port", config.PORT);
app.set("ip", config.IP);

app.listen(app.get("port"), app.get("ip"), () => {
  console.log("\nServer listen in port: ", app.get("port"));
});

// For update user schema for Aws
models.sync_models();

require("./config/config");
let bodyParser = require("body-parser");
let express = require("express");
let app = express();
require("./databases/connection_mongodb");
require("./databases/connection_psql");

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

app.get("/test", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use(require("./routes/index"));

app.set("port", process.env.PORT);
app.set("ip", process.env.IP);

app.listen(app.get("port"), app.get("ip"), () => {
  console.log("\nServer listen in port: ", app.get("port"));
});

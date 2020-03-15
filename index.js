require("./config/config");
let bodyParser = require("body-parser");
let express = require("express");
let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./routes/index'))

app.set("port", process.env.PORT);
app.set("ip", process.env.IP);

app.listen(app.get("port"), app.get("ip"), () => {
  console.log("Servidor escuchando en el puerto: ", app.get("port"));
});

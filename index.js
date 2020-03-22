require("./config/config");
let bodyParser = require("body-parser");
let express = require("express");
//var cors = require('cors')
let app = express();

//app.use(cors())
// Configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./routes/index'))

app.set("port", process.env.PORT);
app.set("ip", process.env.IP);

app.listen(app.get("port"), app.get("ip"), () => {
  console.log("Servidor escuchando en el puerto: ", app.get("port"));
});

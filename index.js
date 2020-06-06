const config = require('./config/config');
const models = require('./controllers/index');
const path = require('path');
//const routes = ['/home','/users','/diseases','/configactions','/'];
let bodyParser = require('body-parser');
let express = require('express');
let app = express();

require('./databases/connection_psql');
require('./databases/connection_mongodb');
require('./services/mqtt/index');

/* ------------------------------------------------------
 *                For avoid CORS errors and use
 *                        body parser
 *-------------------------------------------------------*/

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, token, totp_code, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* ------------------------------------------------------
 *         Define main entry point and routes
 *-------------------------------------------------------*/

app.use(require('./routes/index'));

/* ------------------------------------------------------
 *              Config and upload server
 *-------------------------------------------------------*/

app.set('port', config.PORT);
app.set('ip', config.IP);
app.listen(app.get('port'), app.get('ip'), () => {
  console.log('\nServer listen in port: ', app.get('port'));
});

/* ------------------------------------------------------
 *            For update sequelize schemas
 *             (required for  Aws deploy)
 *-------------------------------------------------------*/
models.sync_models();

/* ------------------------------------------------------
 *              Config web page
 *-------------------------------------------------------*/
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

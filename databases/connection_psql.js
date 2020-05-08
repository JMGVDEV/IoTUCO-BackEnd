const config = require("../config/config");
const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize(
  config.PSQL_DATABASE,
  config.PSQL_USER,
  config.PSQL_PASSWORD,
  {
    host: "localhost",
    port: "5433",
    dialect: "postgres",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Postgres connected");
  })
  .catch((err) => {
    console.log("Postgres, fail to connect: " + err);
  });

// Uncomment to update all tables with the last model
//
//                    WARNING:
// UNCOMMENT THIS LINE WILL DROP ALL DATA IN THE TABLES

//sequelize.sync({ force: true });

module.exports = sequelize;

const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.PSQL_USER,
  process.env.PSQL_PASSWORD,
  {
    host: "localhost",
    port: "5432",
    dialect: "postgres",
    logging: false
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch(err => {
    console.log("Fail to connect: " + err);
  });

// Uncomment to update all tables with the last model
//
//                    WARNING:
// UNCOMMENT THIS LINE WILL DROP ALL DATA IN THE TABLES

//sequelize.sync({ force: true });

module.exports = sequelize;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgres",
  process.env.PSQL_USER,
  process.env.PSQL_PASSWORD,
  {
    host: "localhost",
    port: "5432",
    dialect: "postgres"
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch(err => {
    console.log("Fail to connect" + err);
  });

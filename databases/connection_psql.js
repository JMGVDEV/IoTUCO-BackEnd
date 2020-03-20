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

sequelize.sync();

module.exports = sequelize;

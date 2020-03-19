const Sequelize = require("sequelize");

const User = sequelize.define("usuarios", {
  name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  id: Sequelize.INTEGER,
  role: { type: Sequelize.STRING, defaultValue: "viewer" }, // Role types : "Viewer" || "Admin"
  password: Sequelize.STRING
});

module.exports = { User };

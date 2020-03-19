const Sequelize = require('sequelize')

const User = sequelize.define('usuarios', {
    nombre: Sequelize.STRING,
    cedula: Sequelize.INTEGER,
    rol: Sequelize.STRING,
    contrasena: Sequelize.STRING,
    token: Sequelize.STRING
  })
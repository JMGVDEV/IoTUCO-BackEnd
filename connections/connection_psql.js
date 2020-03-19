const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres', 'postgres', '96043017605:', {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres'
})

sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  })
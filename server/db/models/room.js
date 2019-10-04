const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('room', {
  name: Sequelize.STRING,
  queue: Sequelize.ARRAY(Sequelize.STRING)
})

const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('room', {
  name: Sequelize.STRING,
  queue: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  }
})

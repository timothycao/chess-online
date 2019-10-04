const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('game', {
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  position: {
    type: Sequelize.STRING,
    defaultValue: 'start'
  },
  white: Sequelize.STRING,
  black: Sequelize.STRING
})

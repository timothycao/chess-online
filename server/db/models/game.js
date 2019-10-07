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
  turn: {
    type: Sequelize.STRING,
    defaultValue: 'w'
  },
  white: Sequelize.STRING,
  black: Sequelize.STRING,
  forfeit: Sequelize.STRING
})

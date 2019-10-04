const User = require('./user')
const Room = require('./room')
const Game = require('./game')
const Message = require('./message')

User.belongsTo(Room)
Room.hasMany(User)

User.belongsToMany(Game, {through: 'UserGame'})
Game.belongsToMany(User, {through: 'UserGame'})

User.hasMany(Message)
Message.belongsTo(User)

Room.hasMany(Game)
Game.belongsTo(Room)

Room.hasMany(Message)
Message.belongsTo(Room)

module.exports = {
  User,
  Room,
  Game,
  Message
}

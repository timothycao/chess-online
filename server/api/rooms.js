const router = require('express').Router()
const {Room, User, Game, Message} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.findAll({
      include: [{model: User}]
    })
    res.send(rooms)
  } catch (err) {
    next(err)
  }
})

router.get('/:roomId', async (req, res, next) => {
  try {
    const room = await Room.findOne({
      where: {id: req.params.roomId},
      include: [{all: true}]
    })
    res.send(room)
  } catch (err) {
    next(err)
  }
})

router.get('/:roomId/game', async (req, res, next) => {
  try {
    const game = await Game.findOne({
      where: {roomId: req.params.roomId, active: true}
    })
    res.send(game)
  } catch (err) {
    next(err)
  }
})

router.get('/:roomId/messages', async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      where: {roomId: req.params.roomId}
    })
    res.send(messages)
  } catch (err) {
    next(err)
  }
})

router.put('/:roomId/queue', async (req, res, next) => {
  try {
    const {event, username} = req.body
    let room = await Room.findByPk(req.params.roomId)
    if (event === 'join') {
      room = await room.update({
        queue: [...room.queue, username]
      })
    } else if (event === 'leave') {
      room = await room.update({
        queue: [...room.queue].filter(user => user !== username)
      })
    } else if (event === 'join-front') {
      room = await room.update({
        queue: [username, ...room.queue]
      })
    }
    res.send(room)
  } catch (err) {
    next(err)
  }
})

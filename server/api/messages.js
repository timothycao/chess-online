const router = require('express').Router()
const {Message, User, Room} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.findAll()
    res.send(messages)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {roomId, userId, content} = req.body

    const room = await Room.findByPk(roomId)
    const user = await User.findByPk(userId)
    let message = await Message.build({content})
    await message.setRoom(room, {save: false})
    await message.setUser(user, {save: false})
    message.save()
    message = message.toJSON()
    message.user = user

    res.send(message)
  } catch (err) {
    next(err)
  }
})

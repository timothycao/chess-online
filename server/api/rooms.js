const router = require('express').Router()
const {Room, User} = require('../db/models')

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
    const room = await Room.findByPk(req.params.roomId)
    res.send(room)
  } catch (err) {
    next(err)
  }
})

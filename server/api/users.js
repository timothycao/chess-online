const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const {roomId} = req.body
    const user = await User.findByPk(req.params.userId)
    user.setRoom(roomId)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

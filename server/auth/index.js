const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const {username, password} = req.body
    const user = await User.findOne({where: {username}})
    if (!user) {
      console.log('No such user found:', username)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(password)) {
      console.log('Incorrect password for user:', username)
      res.status(401).send('Wrong username and/or password')
    } else {
      user.setRoom(1)
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const {username, password} = req.body
    const user = await User.create({
      username,
      password,
      roomId: 1
    })
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Username already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', async (req, res, next) => {
  try {
    const {username} = req.body
    const user = await User.findOne({where: {username}})
    user.setRoom(null)
    req.logout()
    req.session.destroy()
    res.redirect('/')
  } catch (err) {
    next(err)
  }
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

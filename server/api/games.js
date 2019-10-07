const router = require('express').Router()
const {Game} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll()
    res.send(games)
  } catch (err) {
    next(err)
  }
})

router.get('/:gameId', async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.gameId)
    res.send(game)
  } catch (err) {
    next(err)
  }
})

router.put('/:gameId/active', async (req, res, next) => {
  try {
    const {active} = req.body
    let game = await Game.findByPk(req.params.gameId)
    game = await game.update({active})
    res.send(game)
  } catch (err) {
    next(err)
  }
})

router.put('/:gameId/players', async (req, res, next) => {
  try {
    const {side, username} = req.body
    let game = await Game.findByPk(req.params.gameId)
    game = await game.update({[side]: username})
    res.send(game)
  } catch (err) {
    next(err)
  }
})

router.put('/:gameId/position', async (req, res, next) => {
  try {
    const {position, turn} = req.body
    let game = await Game.findByPk(req.params.gameId)
    game = await game.update({position, turn})
    res.send(game)
  } catch (err) {
    next(err)
  }
})

router.put('/:gameId/forfeit', async (req, res, next) => {
  try {
    const {username} = req.body
    let game = await Game.findByPk(req.params.gameId)
    game = await game.update({forfeit: username})
    res.send(game)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {roomId} = req.body
    const game = await Game.create({roomId})
    res.send(game)
  } catch (err) {
    next(err)
  }
})

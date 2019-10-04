'use strict'

const db = require('../server/db')
const {User, Room} = require('../server/db/models')

const users = [
  {username: 'timothy', password: '123'},
  {username: 'michael', password: '123'},
  {username: 'richard', password: '123'},
]

const rooms = [
  {name: 'King'},
  {name: 'Queen'},
  {name: 'Bishop'},
  {name: 'Knight'},
  {name: 'Rook'},
  {name: 'Pawn'}
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(rooms.map(room => Room.create(room)))
  await Promise.all(users.map(user => User.create(user)))

  console.log(`seeded ${users.length} users and ${rooms.length} rooms`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

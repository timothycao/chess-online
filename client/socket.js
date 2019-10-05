import io from 'socket.io-client'
import store, {getRoom, getGame, fetchRooms} from './store'

const socket = io(window.location.origin)
const room = window.location.pathname.slice(7) // i.e /rooms/5 sliced to 5

socket.on('connect', () => {

  socket.emit('join-room', room)

  socket.on('update-room', updatedRoom => {
    store.dispatch(getRoom(updatedRoom))
  })

  socket.on('update-game', updatedGame => {
    store.dispatch(getGame(updatedGame))
  })

  socket.on('update-room-count', () => {
    store.dispatch(fetchRooms())
  })

})

export default socket

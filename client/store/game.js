import axios from 'axios'
import socket from '../socket'

// ACTION TYPES
const GET_GAME = 'GET_GAME'

// ACTION CREATORS
export const getGame = game => ({type: GET_GAME, game})

// THUNK CREATORS
export const fetchGame = roomId => async dispatch => {
  try {
    // const res = await axios.get(`/api/games/${gameId}`)
    const res = await axios.get(`/api/rooms/${roomId}/game`)
    dispatch(getGame(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const updatePlayers = (roomId, gameId, side, username) => async dispatch => {
  try {
    const res = await axios.put(`/api/games/${gameId}/players`, {side, username})
    dispatch(getGame(res.data))
    socket.emit('update-players', roomId, res.data)
  } catch (err) {
    console.error(err)
  }
}

export const updatePosition = (roomId, gameId, position, turn) => async dispatch => {
  try {
    const res = await axios.put(`/api/games/${gameId}/position`, {position, turn})
    dispatch(getGame(res.data))
    socket.emit('update-position', roomId, res.data)
  } catch (err) {
    console.error(err)
  }
}

// INITIAL STATE
const defaultGame = {
  position: 'start',
  draggable: false
}

// REDUCER
export default function(state = defaultGame, action) {
  switch (action.type) {
    case GET_GAME:
      return action.game
    default:
      return state
  }
}

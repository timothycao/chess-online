import axios from 'axios'
import socket from '../socket';

// ACTION TYPES
const GET_ROOM = 'GET_ROOM'

// ACTION CREATORS
export const getRoom = room => ({type: GET_ROOM, room})

// THUNK CREATORS
export const fetchRoom = (roomId) => async dispatch => {
  try {
    const res = await axios.get(`/api/rooms/${roomId}`)
    dispatch(getRoom(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const updateQueue = (roomId, event, username) => async dispatch => {
  try {
    const res = await axios.put(`/api/rooms/${roomId}/queue`, {event, username})
    dispatch(getRoom(res.data))
    socket.emit('update-queue', roomId, res.data)
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_ROOM:
      return action.room
    default:
      return state
  }
}

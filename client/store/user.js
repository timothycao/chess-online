import axios from 'axios'
import history from '../history'
import socket from '../socket'
import {fetchRooms} from '../store'

// ACTION TYPES
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

// INITIAL STATE
const defaultUser = {}

// ACTION CREATORS
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

// THUNK CREATORS
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (username, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password})
    dispatch(getUser(res.data))
    dispatch(fetchRooms())
    history.push(`/rooms/${res.data.roomId}`)
    socket.emit('change-room', res.data.roomId)
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
}

export const logout = (username) => async dispatch => {
  try {
    await axios.post('/auth/logout', {username})
    dispatch(fetchRooms())
    socket.emit('change-room', null)
    dispatch(removeUser())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

export const changeRoom = (userId, roomId) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${userId}`, {roomId})
    dispatch(getUser(res.data))
    dispatch(fetchRooms())
    history.push(`/rooms/${roomId}`)
    socket.emit('change-room', roomId)
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

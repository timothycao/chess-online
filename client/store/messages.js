import axios from 'axios'
import socket from '../socket'

// ACTION TYPES
const GET_MESSAGES = 'GET_MESSAGES'
const GET_NEW_MESSAGE = 'GET_NEW_MESSAGE'

// ACTION CREATORS
export const getMessages = messages => ({type: GET_MESSAGES, messages})
export const getNewMessage = message => ({type: GET_NEW_MESSAGE, message})

// THUNK CREATORS
export const fetchMessages = roomId => async dispatch => {
  try {
    const res = await axios.get(`/api/rooms/${roomId}/messages`)
    res.data.sort((a, b) => a.id - b.id)
    dispatch(getMessages(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const sendMessage = (roomId, userId, content) => async dispatch => {
  try {
    const res = await axios.post(`/api/messages`, {roomId, userId, content})
    dispatch(getNewMessage(res.data))
    socket.emit('send-message', roomId, res.data)
  } catch (err) {
    console.error(err)
  }
}

// INITIAL STATE
const defaultMessages = []

// REDUCER
export default function(state = defaultMessages, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages
    case GET_NEW_MESSAGE:
      return [...state, action.message]
    default:
      return state
  }
}

import axios from 'axios'

// ACTION TYPES
const GET_ROOMS = 'GET_ROOMS'

// ACTION CREATORS
export const getRooms = rooms => ({type: GET_ROOMS, rooms})

// THUNK CREATORS
export const fetchRooms = () => async dispatch => {
  try {
    const res = await axios.get('/api/rooms')
    res.data.sort((a, b) => a.id - b.id)
    dispatch(getRooms(res.data))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_ROOMS:
      return action.rooms
    default:
      return state
  }
}

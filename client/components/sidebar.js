import React from 'react'
import {connect} from 'react-redux'
import {changeRoom} from '../store'

const Sidebar = ({isLoggedIn, rooms, user, handleClick}) => {

  return (
    <div className="sidebar">
      {rooms.map(room => (
        <div className={`${isLoggedIn ? 'rooms' : 'disable'}`} key={room.id} onClick={() => {handleClick(user.id, room.id)}}>
          {room.name}
          <span>{room.users.length}</span>
        </div>
      ))}
    </div>
  )
}

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  rooms: state.rooms,
  user: state.user
})

const mapDispatch = dispatch => ({
  handleClick: (userId, roomId) => {
    dispatch(changeRoom(userId, roomId))
  }
})

export default connect(mapState, mapDispatch)(Sidebar)

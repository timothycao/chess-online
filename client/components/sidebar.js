import React from 'react'
import {connect} from 'react-redux'
import {changeRoom} from '../store'

const Sidebar = ({isLoggedIn, user, rooms, currentRoom, game, handleClick}) => {

  const {username} = user
  const {queue} = currentRoom
  const {white, black} = game
  const inGame = white === username || black === username || queue && queue.includes(username)

  return (
    <div className="sidebar" >
      <hr />
      {rooms.map(room => (
        <div className={`${isLoggedIn && !inGame ? user.roomId === room.id ? 'current-room' : 'room' : 'disable'}`} key={room.id} onClick={() => {handleClick(user.id, room.id)}}>
          <div>{room.name}</div>
          <div className="count">{room.users.length}</div>
        </div>
      ))}
    </div>
  )
}

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  user: state.user,
  rooms: state.rooms,
  currentRoom: state.room,
  game: state.game
})

const mapDispatch = dispatch => ({
  handleClick: (userId, roomId) => {
    dispatch(changeRoom(userId, roomId))
  }
})

export default connect(mapState, mapDispatch)(Sidebar)

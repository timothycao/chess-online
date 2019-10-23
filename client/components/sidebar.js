import React, {Component} from 'react'
import {connect} from 'react-redux'
import {changeRoom} from '../store'

class Sidebar extends Component {

  constructor() {
    super()
    this.state = {
      width: null
    }
    this.updateWidth = this.updateWidth.bind(this)
  }

  componentDidMount() {
    this.updateWidth()
    window.addEventListener('resize', this.updateWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth)
  }

  updateWidth() {
    this.setState({width: window.innerWidth})
  }

  render() {
    const {isLoggedIn, user, rooms, currentRoom, game, handleClick} = this.props
    const {username} = user
    const {queue} = currentRoom
    const {white, black} = game
    const inGame = white === username || black === username || queue && queue.includes(username)

    return (
      <div className="sidebar" >
        {this.state.width >= 768 ? <hr /> : null}
        {rooms.map(room => (
          <div className={`${isLoggedIn && !inGame ? user.roomId === room.id ? 'current-room' : 'room' : 'disable'}`} key={room.id} onClick={() => {handleClick(user.id, room.id)}}>
            <div>{room.name}</div>
            <div className="count">{room.users.length}</div>
          </div>
        ))}
      </div>
    )
  }
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

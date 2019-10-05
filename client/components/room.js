import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchRoom} from '../store'
import {Game, Queue} from '../components'

class Room extends Component {
  componentDidMount() {
    this.props.fetchRoom(this.props.user.roomId)
  }

  render() {
    const {room} = this.props
    return (
      <div>
        <h2>Room: {room.name}</h2>
        <h3>Game</h3>
        <Game />
        <Queue queue={room.queue} />
        <h3>Chat</h3>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  room: state.room
})

const mapDispatch = dispatch => ({
  fetchRoom: roomId => {
    dispatch(fetchRoom(roomId))
  }
})

export default connect(mapState, mapDispatch)(Room)

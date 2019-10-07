import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchRoom} from '../store'
import {Game, Queue} from '../components'

class Room extends Component {
  constructor() {
    super()
    this.state = {
      modal: false,
      modalType: null,
      modalMessage: null
    }
    this.setModal = this.setModal.bind(this)
  }

  componentDidMount() {
    this.props.fetchRoom(this.props.user.roomId)
  }

  setModal(status, type, message) {
    this.setState({
      modal: status,
      modalType: type,
      modalMessage: message
    })
  }

  render() {
    const {room} = this.props
    return (
      <div>
        <h2>Room: {room.name}</h2>
        <h3>Game</h3>
        <Game queue={room.queue} {...this.state} setModal={this.setModal} />
        <Queue queue={room.queue} setModal={this.setModal} />
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

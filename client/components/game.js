import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchGame, updateQueue, updatePlayers, updatePosition} from '../store'
import socket from '../socket'
import Chessboard from 'chessboardjsx'
const Chess = require('chess.js')

class Game extends Component {
  constructor() {
    super()
    this.state = {
      width: 640,
      orientation: 'white',
      lightSquareStyle: 'rgb(240, 217, 181)',
      darkSquareStyle: 'rgb(181, 136, 99)',
      dropSquareStyle: 'sienna'
    }
    this.draggable = this.draggable.bind(this)
    this.flipBoard = this.flipBoard.bind(this)
    this.changeBoard = this.changeBoard.bind(this)
    this.joinQueue = this.joinQueue.bind(this)
    this.leaveQueue = this.leaveQueue.bind(this)
    this.checkmate = this.checkmate.bind(this)
    this.stalemate = this.stalemate.bind(this)
    this.check = this.check.bind(this)
    this.checkStatus = this.checkStatus.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  componentDidMount() {
    this.props.fetchGame(this.props.user.roomId)
    this.game = new Chess()
  }

  componentDidUpdate() {
    this.game.load(this.props.game.position)
    this.checkStatus()
  }

  draggable() {
    if (this.props.user.username === this.props.game.white && this.props.game.black) {
      return this.props.game.turn === 'w' && !this.game.in_checkmate() && !this.game.in_stalemate()
    } else if (this.props.user.username === this.props.game.black && this.props.game.white) {
      return this.props.game.turn === 'b' && !this.game.in_checkmate() && !this.game.in_stalemate()
    } else {
      return false
    }
  }

  flipBoard() {
    if (this.state.orientation === 'white') {
      this.setState({orientation: 'black'})
    } else {
      this.setState({orientation: 'white'})
    }
  }

  changeBoard() {
    if (
      this.state.lightSquareStyle === 'rgb(240, 217, 181)' &&
      this.state.darkSquareStyle === 'rgb(181, 136, 99)'
    ) {
      this.setState({
        lightSquareStyle: 'rgb(238, 238, 210)',
        darkSquareStyle: 'rgb(118, 150, 86)',
        dropSquareStyle: 'rgb(70, 90, 51)'
      })
    } else {
      this.setState({
        lightSquareStyle: 'rgb(240, 217, 181)',
        darkSquareStyle: 'rgb(181, 136, 99)',
        dropSquareStyle: 'sienna'
      })
    }
  }

  joinQueue() {
    this.props.updateQueue(this.props.user.roomId, 'join', this.props.user.username)
  }

  leaveQueue() {
    this.props.updateQueue(this.props.user.roomId, 'leave', this.props.user.username)
  }

  joinGame(side) {
    this.setState({orientation: side})
    this.props.updatePlayers(this.props.user.roomId, this.props.game.id, side, this.props.user.username)
  }

  leaveGame(side) {
    this.props.updatePlayers(this.props.user.roomId, this.props.game.id, side, null)
  }

  checkmate() {
    if (this.props.game.turn === 'w') {
      console.log(`${this.props.game.black} checkmates ${this.props.game.white}!`)
    } else {
      console.log(`${this.props.game.white} checkmates ${this.props.game.black}!`)
    }
  }

  stalemate() {
    console.log(`Stalemate between ${this.props.game.white} and ${this.props.game.black}!`)
  }

  check() {
    if (this.props.game.turn === 'w') {
      console.log(`${this.props.game.black} checks ${this.props.game.white}.`)
    } else {
      console.log(`${this.props.game.white} checks ${this.props.game.black}.`)
    }
  }

  checkStatus() {
    if (this.game.in_checkmate()) {
      this.checkmate()
    } else if (this.game.in_stalemate()) {
      this.stalemate()
    } else if (this.game.in_check()) {
      this.check()
    }
  }

  onDrop({sourceSquare, targetSquare}) {
    // see if the move is legal
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen
    })

    if (move === null) {
      return
    } else {
      this.props.updatePosition(this.props.user.roomId, this.props.game.id, this.game.fen(), this.game.turn())
    }
  }

  render() {
    const {user, game} = this.props
    const {username} = user
    const {position, white, black} = game
    const {width, orientation, lightSquareStyle, darkSquareStyle, dropSquareStyle} = this.state

    return (
      <div>
        <div className="game">
          <Chessboard
            position={position}
            draggable={this.draggable()}
            width={width}
            orientation={
              Object.keys(game).find(key => game[key] === username) ||
              orientation
            }
            lightSquareStyle={{backgroundColor: lightSquareStyle}}
            darkSquareStyle={{backgroundColor: darkSquareStyle}}
            dropSquareStyle={{backgroundColor: dropSquareStyle}}
            onDrop={this.onDrop}
          />
        </div>
        <button onClick={this.joinQueue}>Join Queue</button>
        <button onClick={this.leaveQueue}>Leave Queue</button>
        <button onClick={() => this.joinGame('white')}>Select White</button>
        <button onClick={() => this.joinGame('black')}>Select Black</button>
        <button onClick={() => this.leaveGame('white')}>Leave White</button>
        <button onClick={() => this.leaveGame('black')}>Leave Black</button>
        <button onClick={this.flipBoard} disabled={username === white || username === black}>Flip Board</button>
        <button onClick={this.changeBoard}>Change Board</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  room: state.room,
  game: state.game
})

const mapDispatchToProps = dispatch => ({
  fetchGame: roomId => {
    dispatch(fetchGame(roomId))
  },
  updateQueue: (roomId, event, username) => {
    dispatch(updateQueue(roomId, event, username))
  },
  updatePlayers: (roomId, gameId, side, username) => {
    dispatch(updatePlayers(roomId, gameId, side, username))
  },
  updatePosition: (roomId, gameId, position, turn) => {
    dispatch(updatePosition(roomId, gameId, position, turn))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)

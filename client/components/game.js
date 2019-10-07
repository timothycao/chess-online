import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchGame, updateQueue, updatePlayers, updatePosition, forfeitGame, fetchNewGame} from '../store'
import {Modal} from '../components'
import Chessboard from 'chessboardjsx'
const Chess = require('chess.js')

class Game extends Component {
  constructor(props) {
    super(props)
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
    this.joinGame = this.joinGame.bind(this)
    this.leaveGame = this.leaveGame.bind(this)
    this.forfeit = this.forfeit.bind(this)
    this.playAgain = this.playAgain.bind(this)
    this.newGame = this.newGame.bind(this)
    this.checkmateModal = this.checkmateModal.bind(this)
    this.stalemateModal = this.stalemateModal.bind(this)
    this.checkModal = this.checkModal.bind(this)
    this.forfeitModal = this.forfeitModal.bind(this)
    this.checkStatus = this.checkStatus.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  componentDidMount() {
    this.props.fetchGame(this.props.user.roomId)
    this.game = new Chess()
  }

  componentDidUpdate() {
    this.props.setModal(false)
    if (this.props.queue && this.props.queue[0] === this.props.user.username && (!this.props.game.white || !this.props.game.black)) {
      this.props.setModal(true, 'selection', 'Select a side')
    } else if ((this.props.game.white === this.props.user.username && !this.props.game.black) || (this.props.game.black === this.props.user.username && !this.props.game.white)) {
      this.props.setModal(true, 'wait', 'Waiting for an opponent...')
    } else {
      this.game.load(this.props.game.position)
      this.checkStatus()
    }
  }

  draggable() {
    if (this.props.user.username === this.props.game.white && this.props.game.black) {
      return this.props.game.turn === 'w' && (this.game ? !this.game.in_checkmate() && !this.game.in_stalemate() : true)
    } else if (this.props.user.username === this.props.game.black && this.props.game.white) {
      return this.props.game.turn === 'b' && (this.game ? !this.game.in_checkmate() && !this.game.in_stalemate() : true)
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
    this.props.updatePlayers(this.props.user.roomId, this.props.game.id, side, this.props.user.username)
    this.leaveQueue()
  }

  leaveGame(side) {
    this.props.updatePlayers(this.props.user.roomId, this.props.game.id, side, null)
  }

  forfeit() {
    this.props.forfeitGame(this.props.user.roomId, this.props.game.id, this.props.user.username)
  }

  playAgain() {
    this.props.updateQueue(this.props.user.roomId, 'join-front', this.props.user.username)
  }

  newGame() {
    this.props.setModal(false)
    this.game.reset()
    if (this.props.modalType === 'playagain') {
      this.props.fetchNewGame(this.props.user.roomId, this.props.game.id)
    }
  }

  checkmateModal() {
    if (this.props.game.turn === 'w') {
      if (this.props.user.username === this.props.game.black) {
        this.props.setModal(true, 'playagain', `You have checkmated ${this.props.game.white}!`)
      } else if (this.props.user.username === this.props.game.white) {
        this.props.setModal(true, 'gameover', 'You have been checkmated!')
      } else {
        this.props.setModal(true, 'gameover', `${this.props.game.black} checkmates ${this.props.game.white}!`)
      }
    } else if (this.props.game.turn === 'b') {
      if (this.props.user.username === this.props.game.white) {
        this.props.setModal(true, 'playagain', `You have checkmated ${this.props.game.black}!`)
      } else if (this.props.user.username === this.props.game.black) {
        this.props.setModal(true, 'gameover', 'You have been checkmated!')
      } else {
        this.props.setModal(true, 'gameover', `${this.props.game.white} checkmates ${this.props.game.black}!`)
      }
    }
  }

  stalemateModal() {
    if (this.props.user.username === this.props.game.white || this.props.user.username === this.props.game.black) {
      this.props.setModal(true, 'gameover', 'You have stalemated!')
    } else {
      this.props.setModal(true, 'gameover', `Stalemate between ${this.props.game.white} and ${this.props.game.black}!`)
    }
  }

  checkModal() {
    if (this.props.game.turn === 'w') {
      console.log(`${this.props.game.black} checks ${this.props.game.white}.`)
    } else {
      console.log(`${this.props.game.white} checks ${this.props.game.black}.`)
    }
  }

  forfeitModal() {
    if (this.props.user.username === this.props.game.forfeit) {
      this.props.setModal(true, 'gameover', 'You have forfeited!')
    } else if (this.props.user.username === this.props.game.white || this.props.user.username === this.props.game.black) {
      this.props.setModal(true, 'playagain', `${this.props.game.forfeit} has forfeited!`)
    } else {
      this.props.setModal(true, 'gameover', `${this.props.game.forfeit} has forfeited!`)
    }
  }

  checkStatus() {
    if (this.game.in_checkmate()) {
      this.checkmateModal()
    } else if (this.game.in_stalemate()) {
      this.stalemateModal()
    } else if (this.game.in_check()) {
      this.checkModal()
    } else if (this.props.game.forfeit) {
      this.forfeitModal()
    }
  }

  onDrop({sourceSquare, targetSquare}) {
    // see if the move is legal
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen
    })

    if (move) {
      this.props.updatePosition(this.props.user.roomId, this.props.game.id, this.game.fen(), this.game.turn())
    }
  }

  render() {
    const {user, game, modal, modalType, modalMessage, queue} = this.props
    const {username} = user
    const {position, white, black, forfeit} = game
    const {width, orientation, lightSquareStyle, darkSquareStyle, dropSquareStyle} = this.state

    return (
      <div className="game">
        <div className="chess">
          {
            modal ?
            <Modal type={modalType} message={modalMessage} joinGame={this.joinGame} playAgain={this.playAgain} newGame={this.newGame} white={white} black={black} queue={queue} username={username} /> :
            null
          }
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
        {
          username === white || username === black ?
          white && black ?
          <button onClick={this.forfeit} disabled={forfeit || this.game.in_checkmate() || this.game.in_stalemate()}>Forfeit</button> :
          <button onClick={() => this.leaveGame(username === white ? 'white' : 'black')}>Leave Game</button> :
          queue && queue.includes(username) ?
          <button onClick={this.leaveQueue}>Leave Queue</button> :
          <button onClick={this.joinQueue}>Join Queue</button>
        }
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
  },
  forfeitGame: (roomId, gameId, username) => {
    dispatch(forfeitGame(roomId, gameId, username))
  },
  fetchNewGame: (roomId, gameId) => {
    dispatch(fetchNewGame(roomId, gameId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)

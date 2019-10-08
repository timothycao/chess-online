import React, {Component} from 'react'

class Modal extends Component {
  constructor() {
    super()
    this.state = {
      time: 10,
      timerOn: false
    }
    this.startTimer = this.startTimer.bind(this)
  }

  startTimer() {
    this.setState({timerOn: true})
    const timer = setInterval(() => {
      if (this.state.time <= 1) {
        clearInterval(timer)
        this.props.newGame()
      } else {
        this.setState((prevState) => ({
          time: prevState.time - 1
        }))
      }
    }, 1000)
  }

  render() {
    const {time, timerOn} = this.state
    const {type, message, joinGame, playAgain, white, black, queue, username} = this.props

    return (
      <div className="modal">
        <div className="modal-content">
          {
            type === 'playagain' ?
            username === queue[0] ?
            <div className="modal-message">You have been added to the front of the queue!</div> :
            <div className="modal-message">{message}</div> :
            <div className="modal-message">{message}</div>
          }
          {
            type === 'playagain' || type === 'gameover' ?
            <div className="modal-message">
              {!timerOn ? this.startTimer() : null}
              Next game starts in <span className="modal-timer">{time}</span>...
            </div> :
            null
          }
          {
            type === 'selection' ?
            <div className="modal-buttons">
              <button className="white-button" onClick={() => joinGame('white')} disabled={white && white !== username}>White</button>
              <button className="black-button" onClick={() => joinGame('black')} disabled={black && black !== username}>Black</button>
            </div> :
            type === 'playagain' ?
            username === queue[0] ?
            null :
            <div className="modal-buttons">
              <button className="play-again-button" onClick={playAgain}>Play Again</button>
            </div> :
            null
          }
        </div>
      </div>
    )
  }
}

export default Modal

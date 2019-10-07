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
            type === 'selection' ?
            <div>
              {message}
              <button onClick={() => joinGame('white')} disabled={white && white !== username}>White</button>
              <button onClick={() => joinGame('black')} disabled={black && black !== username}>Black</button>
            </div> :
            type === 'wait' ?
            <div>
              {message}
            </div> :
            type === 'playagain' ?
            <div>
              {
                username === queue[0] ?
                <div>You have been added to the front of the queue!</div> :
                <div>
                  {message}
                  <button onClick={playAgain}>Play Again</button>
                </div>
              }
              {!timerOn ? this.startTimer() : null}
              <div>Next game starts in {time}...</div>
            </div> :
            type === 'gameover' ?
            <div>
              {message}
              {!timerOn ? this.startTimer() : null}
              <div>Next game starts in {time}...</div>
            </div> :
            <div>
              {message}
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Modal

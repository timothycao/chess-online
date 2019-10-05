import React from 'react'
import {Login, Signup} from '../components'

const Modal = ({type, toggleAuth, message, play, joinGame, white, black, username, win}) => {

  return (
    <div className="modal">
      <div className="modal-content">
        {
          type === "login" ?
          <div>
            <Login />
            <div>Don't have an account?</div>
            <span onClick={toggleAuth}>Signup</span>
          </div> :
          type === "signup" ?
          <div>
            <Signup />
            <div>Already have an account?</div>
            <span onClick={toggleAuth}>Login</span>
          </div> :
          type === "play" ?
          <div>
            {message}
            <button onClick={() => joinGame("white", black && black !== username ? "start-game" : null, black && black === username ? null : black)}disabled={white && white !== username}>White</button>
            <button onClick={() => joinGame("black", white && white !== username ? "start-game" : null, white && white === username ? null : white)} disabled={black && black !== username}>Black</button>
          </div> :
          win ?
          <div>
            {message}
            <button onClick={play}>Play Again</button>
          </div> :
          <div>
            {message}
          </div>
        }
      </div>
    </div>
  )
}

export default Modal

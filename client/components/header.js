import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Header = ({isLoggedIn, handleClick, user, room, game}) => (
  <div>
    <h1>Chess Online</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          <a
            href="#"
            onClick={
              () => handleClick(
                user.username === game.white || user.username === game.black ?
                game.white && game.black ?
                'inGame' :
                'inSelection' :
                room.queue && room.queue.includes(user.username) ?
                'inQueue' :
                null,
                user.roomId,
                game.id,
                user.username === game.white ?
                'white' :
                user.username === game.black ?
                'black' :
                null,
                user.username
              )
            }
          >
            Logout
          </a>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    room: state.room,
    game: state.game
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick(status, roomId, gameId, side, username) {
      dispatch(logout(status, roomId, gameId, side, username))
    }
  }
}

export default connect(mapState, mapDispatch)(Header)

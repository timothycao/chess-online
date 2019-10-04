import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Header = ({isLoggedIn, handleClick, user}) => (
  <div>
    <h1>Chess Online</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          <a href="#" onClick={() => handleClick(user.username)}>
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
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick(username) {
      dispatch(logout(username))
    }
  }
}

export default connect(mapState, mapDispatch)(Header)

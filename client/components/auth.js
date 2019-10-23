import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'

const Auth = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="content">
      <form className="auth" onSubmit={handleSubmit} name={name}>
        <div className="home-message">
          <h3>Welcome to Chess Online!</h3>
          <div>We are a community of chess enthusiasts. Our interactive platform provides player vs player competition through different rooms. Each room features a game with player order managed by queue. Winners can continue to play until they lose.</div>
        </div>
        <div className="auth-message">
          {
            error && error.response ?
            <div>{error.response.data}</div> :
            <div>{displayName} to get started!</div>
          }
        </div>
        <div className="auth-form">
          <input className="auth-input" name="username" type="text" placeholder="Username" required />
          <input className="auth-input" name="password" type="password" placeholder="Password" required />
          <button className="auth-button" type="submit">{displayName}</button>
        </div>
      </form>
      <div />
      <div />
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Signup',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(auth(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(Auth)
export const Signup = connect(mapSignup, mapDispatch)(Auth)

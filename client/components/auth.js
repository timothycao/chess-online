import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'

const Auth = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="content">
      <div className="auth-greeting">
        <h3>Welcome to Chess Online!</h3>
        <div>We are a community of chess enthusiasts. Our interactive platform features gamerooms, each of which hosts player vs player "King of the Court" style competition. Join different rooms to play, or watch and chat with fellow enthusiasts!</div>
      </div>
      <div />
      <form className="auth" onSubmit={handleSubmit} name={name}>
        <div className="auth-message">
          {
            error && error.response ?
            <div>{error.response.data}</div> :
            <div>{displayName} to continue.</div>
          }
        </div>
        <div className="auth-form">
          <input className="auth-input" name="username" type="text" placeholder="Username" required />
          <input className="auth-input" name="password" type="password" placeholder="Password" required />
          <button className="auth-button" type="submit">{displayName}</button>
        </div>
      </form>
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

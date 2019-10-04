import React from 'react'
import {connect} from 'react-redux'

export const UserHome = props => {
  const {username} = props

  return (
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  )
}

const mapState = state => {
  return {
    username: state.user.username
  }
}

export default connect(mapState)(UserHome)

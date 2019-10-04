import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Login, Signup, Room} from './components'
import {me, fetchRooms} from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, user} = this.props

    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            <Route path={`/rooms/${user.roomId}`} component={Room} />
            <Redirect to={`/rooms/${user.roomId}`} />
          </Switch>
        )}
        <Route component={Login} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchRooms())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

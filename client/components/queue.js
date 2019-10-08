import React from 'react'
import {connect} from 'react-redux'

const Queue = ({game, queue}) => {
  return (
    <div className="queue">
      <div className="room-header">
        <div className="player">White: {game.white}</div>
        <div className="player">Black: {game.black}</div>
      </div>
      <div className="room-header">
        <div>Queue:&nbsp;</div>
        <div>{queue && queue.join(', ')}</div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  game: state.game
})

export default connect(mapStateToProps)(Queue)

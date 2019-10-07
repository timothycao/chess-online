import React from 'react'
import {connect} from 'react-redux'

const Queue = ({game, queue}) => {
  return (
    <div>
      <h3>Players</h3>
      <div>White: {game.white}</div>
      <div>Black: {game.black}</div>
      <h3>Queue</h3>
      <div>
        {queue && queue.join(', ')}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  game: state.game
})

export default connect(mapStateToProps)(Queue)

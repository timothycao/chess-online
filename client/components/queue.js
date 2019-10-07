import React from 'react'
import {connect} from 'react-redux'

const Queue = ({game, queue}) => {
  return (
    <div className="queue">
      <div>Players</div>
      <div>White: {game.white}</div>
      <div>Black: {game.black}</div>
      <div>Queue</div>
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

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMessages, sendMessage} from '../store'

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      content: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchMessages(this.props.user.roomId)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.sendMessage(
      this.props.user.roomId,
      this.props.user.id,
      this.state.content
    )
    this.setState({content: ''})
  }

  render() {
    const {messages, name} = this.props
    const {content} = this.state

    return (
      <div className="chat">
        <div className="room-header">{name}'s Chatroom</div>
        <div className="chat-box">
          {messages.map(message => {
            return (
              <div key={message.id}>
                {`${message.user.username}: ${message.content}`}
              </div>
            )
          })}
        </div>
        <form className="chat-bar" onSubmit={this.handleSubmit}>
          <input className="chat-input" type="text" name="content" value={content} onChange={this.handleChange} placeholder="Type your message here..." />
          <button className="chat-button" type="submit" disabled={!content.length}>Send</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  messages: state.messages
})

const mapDispatchToProps = dispatch => ({
  fetchMessages: roomId => {
    dispatch(fetchMessages(roomId))
  },
  sendMessage: (roomId, userId, content) => {
    dispatch(sendMessage(roomId, userId, content))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

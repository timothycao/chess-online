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
    const {messages} = this.props
    const {content} = this.state

    return (
      <div className="chat">
        <div>Chat</div>
        <div>
          {messages.map(message => {
            return (
              <div key={message.id}>
                {`${message.user.username}: ${message.content}`}
              </div>
            )
          })}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="content" value={content} onChange={this.handleChange}/>
          <button type="submit">Send</button>
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

module.exports = io => {
  io.on('connection', socket => {
    console.log(`Socket ${socket.id} has connected to the server`)

    socket.on('join-room', room => {
      socket.room = room
      socket.join(room)
    })

    socket.on('change-room', newRoom => {
      if (socket.room !== newRoom) {
        socket.leave(socket.room)
        socket.join(newRoom)
        socket.room = newRoom
      }
      socket.broadcast.emit('update-room-count')
    })

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} has disconnected from the server`)
    })
  })
}

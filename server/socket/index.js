module.exports = io => {
  io.on('connection', socket => {
    console.log(`Socket ${socket.id} has connected to the server`)

    socket.on('join-room', roomId => {
      socket.room = roomId
      socket.join(roomId)
    })

    socket.on('change-room', newRoomId => {
      if (socket.room !== newRoomId) {
        socket.leave(socket.room)
        socket.join(newRoomId)
        socket.room = newRoomId
      }
      socket.broadcast.emit('update-room-count')
    })

    socket.on('update-queue', (roomId, room) => {
      socket.to(roomId).emit('update-room', room)
    })

    socket.on('update-players', (roomId, game) => {
      socket.to(roomId).emit('update-game', game)
    })

    socket.on('update-position', (roomId, game) => {
      socket.to(roomId).emit('update-game', game)
    })

    socket.on('forfeit', (roomId, game) => {
      socket.to(roomId).emit('update-game', game)
    })

    socket.on('new-game', (roomId, game) => {
      socket.to(roomId).emit('update-game', game)
    })

    socket.on('send-message', (roomId, message) => {
      socket.to(roomId).emit('update-chat', message)
    })

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} has disconnected from the server`)
    })
  })
}

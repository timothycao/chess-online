module.exports = io => {
  io.on('connection', socket => {
    console.log(`Socket ${socket.id} has connected to the server`)

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} has disconnected from the server`)
    })
  })
}

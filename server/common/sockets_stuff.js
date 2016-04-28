'use strict'

module.exports = function (io) {
  io.sockets.on('connection', function (socket) {
    console.log('*** Connection made : >>>> socket query received >>>> ', socket.request._query)
    let channel = ''
    socket.emit('connection_success_event_from_server', {a: 'b'})
  })
}

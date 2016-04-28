'use strict'

let env = require('./common/lib/environment')
let log = require('./common/lib/logger')
let express = require('express')
let app = express()
// let secrets = require('../../secrets')
let sockets_stuff = require('./common/sockets_stuff')
let mongo = require('mongoskin')
let socket_io = require('socket.io')
app.set('logger', log)
app.set('env', env)

const _db = mongo.db(env.get('DB_URL'), { native_parser: true })
app.set('_db', _db)

app.io = socket_io()

// Bootstrap application settings
require('./common/express')(app)

// Bootstrap routes
require('./common/routes')(app)
let server = app.listen(app.get('port'))
app.io.attach(server)

// start websocket stuff
sockets_stuff(app.io)

log.info('started app at ', env.get('appHostname'), ' in ', env.get('NODE_ENV'))

'use strict'

let express = require('express')
let session = require('express-session')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let MongoStore = require('connect-mongo')(session)
let path = require('path')
let nunjucks = require('express-nunjucks')

module.exports = function (app) {
  let env = app.get('env')
  let log = app.get('logger')
  let _db = app.get('_db')

  app.set('port', (process.env.PORT || 5000))

  app.disable('x-powered-by')
  app.set('views', path.join(__dirname, '..', 'views'))

  app.set('view cache', false)

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
  app.use(express.static(path.join(__dirname, '../..', 'public')))
  app.use(cookieParser())
  let sess = {
    resave: true,
    saveUninitialized: true,
    key: env.get('SESSIONS_KEY'),
    name: env.get('SESSIONS_NAME'),
    secret: env.get('SESSIONS_SECRET'),
    cookie: {
      httpOnly: false
    },
    store: new MongoStore({ url: env.get('SESSIONS_DBURL'), autoReconnect: true})
  }

  app.use(session(sess))
  // app.use(flash())

  // ejs
  // set views path, template engine and default layout
  app.set('views', path.join(__dirname, '..', 'views'))

  // Configuring the template system.
  nunjucks.setup({
    autoescape: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
    watch: true,
    noCache: true,
    tags: {}
  }, app)

  app.set('view engine', 'html')
}

'use strict'

let express = require('express')
let session = require('express-session')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let MongoStore = require('connect-mongo')(session)
let path = require('path')
// let flash = require('express-flash')
// let methodOverride = require('method-override')
let httpProxy = require('http-proxy')
let proxy = httpProxy.createProxyServer()
let nunjucks = require('express-nunjucks')

module.exports = function (app) {
  let env = app.get('env')
  let log = app.get('logger')
  let _db = app.get('_db')

  app.set('port', (process.env.PORT || 5000))

  // X-Powered-By header has no functional value.
  // Keeping it makes it easier for an attacker to build the site's profile
  // It can be removed safely
  app.disable('x-powered-by')
  app.set('views', path.join(__dirname, '..', 'views'))

  app.set('view cache', false)

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
  // app.use(methodOverride())
  app.use(express.static(path.join(__dirname, '../..', 'public')))
  app.use(cookieParser())
  let sess = {
    resave: true,
    saveUninitialized: true,
    // Use generic cookie name for security purposes
    key: env.get('SESSIONS_KEY'),
    name: env.get('SESSIONS_NAME'),
    secret: env.get('SESSIONS_SECRET'),
    // Add HTTPOnly, Secure attributes on Session Cookie
    // If secure is set, and you access your site over HTTP, the cookie will not be set
    cookie: {
      httpOnly: false
    },
    store: new MongoStore({ url: env.get('SESSIONS_DBURL'), autoReconnect: true})
  // store: new RedisStore({ url: redis_url })
  }

  app.use(session(sess))
  // app.use(flash())

  // ejs
  // set views path, template engine and default layout
  app.set('views', path.join(__dirname, '..', 'views'))

  // Configuring the template system.
  nunjucks.setup({
    // (default: true) controls if output with dangerous characters are escaped automatically.
    autoescape: true,
    // (default: false) throw errors when outputting a null/undefined value.
    throwOnUndefined: false,
    // (default: false) automatically remove trailing newlines from a block/tag.
    trimBlocks: false,
    // (default: false) automatically remove leading whitespace from a block/tag.
    lstripBlocks: false,
    // (default: false) if true, the system will automatically update templates when they are changed on the filesystem.
    watch: true,
    // (default: false) if true, the system will avoid using a cache and templates will be recompiled every single time.
    noCache: true,
    // (default: see nunjucks syntax) defines the syntax for nunjucks tags.
    tags: {}
  }, app)

  app.set('view engine', 'html')

  // It is important to catch any errors from the proxy or the
  // server will crash. An example of this is connecting to the
  // server when webpack is bundling
  proxy.on('error', function (e) {
    console.log('Could not connect to proxy, please try again...')
  })
}

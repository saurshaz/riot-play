'use strict'
let _ = require('lodash')

module.exports = function (app) {
  let log = app.get('logger')
  let env = app.get('env')
  let core_service = require('../core/')(app)
  // let thirdparty_service = require('../thirdparty/')

  app.all('*', function (req, res, next) {
    // if unauthenticated and a fyler call, return a JSON
    let origin = env.get('CORS_ALLOWED_ORIGINS')[req.header('referer') && req.header('referer').toLowerCase()] ? req.header('referer') : ''
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DEletE,OPTIONS')
    res.header('Access-Control-Allow-Headers', '*')
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200)
    } else {
      // if (req.url === "/fyler" && !req.isAuthenticated()) {
      //     res.json({ "error": "not  authenticated", "screen": "/apiscreen.html" })
      // } else {
      next()
    // }
    }
  })

  app.get('/', function (req, res) {
    res.cookie('appinit', 'true')

    // call a function
    let input_data = {a: 'a_val',b: 'b_val'}
    let fn_to_call = req.query.handler
    log.info('core_service[fn_to_call]' , core_service[fn_to_call])
    core_service[fn_to_call](input_data, function (err, fn_result) {
      res.render('index', {result: fn_result})
    })
  })

  app.get('/api', function (req, res) {
    res.cookie('appinit', 'true')

    // call a function
    let input_data = {a: 'a_val',b: 'b_val'}
    let fn_to_call = req.query.handler

    core_service[fn_to_call](input_data, function (err, fn_result) {
      log.info('fn_result ', fn_result)
      res.json(fn_result)
    })
  })
}

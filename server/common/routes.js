'use strict'
let _ = require('ramda')

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
    if ('OPTIONS' === req.method) {
      res.sendStatus(200)
    } else {
      // if (req.url === "/fyler" && !req.isAuthenticated()) {
      //     res.json({ "error": "not  authenticated", "screen": "/apiscreen.html" })
      // } else {
      next()
    // }
    }
  })

  function renderWithServiceOutput (passedConfig, response) {
    let _default_json = { api: 'ok' }
    if (core_service[passedConfig.fn_to_call] && typeof core_service[passedConfig.fn_to_call] === 'function') {
      core_service[passedConfig.fn_to_call](passedConfig.input_data, function (err, fn_result) {
        if (!err) {
          if (passedConfig.isJsonOutput && !passedConfig.view_name) {
            response.json({ result: fn_result })
          } else {
            response.render(passedConfig.view_name, { result: fn_result })
          }
        } else {
          response.render('error', { error: err })
        }
      })
    } else {
      if (passedConfig.isJsonOutput && !passedConfig.view_name) {
        response.json({ result: _default_json })
      } else {
        response.render(passedConfig.view_name, { result: _default_json })
      }
    }
  }

  app.get('/', function (req, res) {
    res.cookie('appinit', 'true')

    // call a function
    let input_data = { a: 'a_val', b: 'b_val' }
    let fn_to_call = req.query.handler
    let passedConfig = {
      input_data: input_data,
      fn_to_call: fn_to_call,
      view_name: 'index',
      isJsonOutput: false
    }
    renderWithServiceOutput(passedConfig, res)
  })

  app.get('/api', function (req, res) {
    res.cookie('appinit', 'true')

    // call a function
    let input_data = { a: 'a_val', b: 'b_val' }
    let fn_to_call = req.query.handler
    let passedConfig = {
      input_data: input_data,
      fn_to_call: fn_to_call,
      view: undefined,
      isJsonOutput: true
    }

    renderWithServiceOutput(passedConfig, res)
  })
}

'use strict'
// let _ = require('ramda')

module.exports = function (app) {
  let log = app.get('logger')
  let env = app.get('env')
  const STATIC_RESOURCES_SERVER_ADDRESS = env.get('STATIC_RESOURCES_SERVER_ADDRESS') || '.'
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
    if (req.method === 'OPTIONS') {
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
            response.render(passedConfig.view_name, {
              result: fn_result, STATIC_RESOURCES_SERVER_ADDRESS: STATIC_RESOURCES_SERVER_ADDRESS
            })
          }
        } else {
          response.render('error', {
            error: err, STATIC_RESOURCES_SERVER_ADDRESS: STATIC_RESOURCES_SERVER_ADDRESS
          })
        }
      })
    } else {
      if (passedConfig.isJsonOutput && !passedConfig.view_name) {
        response.json({ result: _default_json })
      } else {
        response.render(passedConfig.view_name, {
          result: _default_json, STATIC_RESOURCES_SERVER_ADDRESS: STATIC_RESOURCES_SERVER_ADDRESS
        })
      }
    }
  }

  // http://localhost:6600/home?handler=hello&view=login&a=g&b=f&a=i&a=u#home
  // this request will showcase `server` dynamism, as well as `client` dynamism
  // `server` dynamism - base d on handler from querystring. view is also taken from the querystring
  // `client` side dynamism is by routing to component named `view` from querystring, inside the foler named `home`
  // `home` folder because we are on route `/home`. this also can be dynamized in future @todo
  // 
  // /view/hello/fylerclient/fyler/dev.html
  app.get('/view/:handler/:page/:domain/*.html', function (req, res) {
    res.cookie('appinit', 'true')
    let template = req.path.slice(req.path.lastIndexOf('/') + 1).split('.')[0]
    let isJson = req.path.slice(req.path.lastIndexOf('/') + 1).split('.')[1] === 'json'
    // TODO :: make it passable from PUT request instead of GET
    // call a function
    let input_data = { a: 'a_val', b: 'b_val' }
    let fn_to_call = req.params.handler
    let passedConfig = {
      input_data: input_data,
      fn_to_call: fn_to_call,
      view_name: template || 'index',
      isJsonOutput: isJson
    }
    renderWithServiceOutput(passedConfig, res)
  })

  // todo :: get rid of below route or the hardcoding. done for mobile preview
  app.get('/main', function (req, res) {
    res.redirect('/home?handler=hello&view=dev&domain=fyler&page=app-container')
  })

  app.put('/', function (req, res) {
    res.cookie('appinit', 'true')

    // TODO :: make it passable from PUT request instead of GET
    // call a function
    let input_data = req.body.input_data || { a: 'a_val', b: 'b_val' }
    let fn_to_call = req.body.fn_to_call || req.query.handler
    let passedConfig = {
      input_data: input_data,
      fn_to_call: fn_to_call,
      view_name: 'index',
      isJsonOutput: false
    }
    renderWithServiceOutput(passedConfig, res)
  })

  app.put('/api', function (req, res) {
    res.cookie('appinit', 'true')

    // TODO :: make it passable from PUT request instead of GET
    // call a function
    let input_data = { a: 'a_val', b: 'b_val' }
    let fn_to_call = req.query.handler
    let passedConfig = {
      input_data: input_data,
      fn_to_call: fn_to_call,
      view_name: undefined,
      isJsonOutput: true
    }

    renderWithServiceOutput(passedConfig, res)
  })
}

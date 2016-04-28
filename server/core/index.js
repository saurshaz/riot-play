'use strict'

let log = require('../common/lib/logger')
let env = require('../common/lib/environment')
let async = require('async')
let path = require('path')

module.exports = function () {
  let functions = {}
  require('fs').readdirSync(path.join(__dirname, 'modules')).forEach(function (file) {
    /* Store module with its name (from filename) */
    functions[file.split('.')[0]] = require(path.join(__dirname, 'modules', file)).bind(this)
  })

  return functions
}

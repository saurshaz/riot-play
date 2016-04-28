'use strict'

let log = require('../../common/lib/logger')

// function for generic logic in fn_hello
module.exports = function (data, cb) {
  log.info('data ', data)
  log.info(' Called from greater world ')
  cb(undefined, {result: ' Called from greater world '})
}

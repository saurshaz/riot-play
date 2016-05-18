'use strict'

import R from 'ramda'
import $ from 'jquery'

module.exports = {
  getJSON: R.curry(function (callback, url) {
    $.getJSON(url, callback)
  }),

  ajax: R.curry(function (callback, options) {
    $.ajax(options, callback)
  }),

  callFyler: R.curry(function (config, callback) {
    let Fyler = require('Fyler')()
    Fyler.run(config, callback)
  }),

  setHtml: R.curry(function (sel, html) {
    $(sel).html(html)
  })
}

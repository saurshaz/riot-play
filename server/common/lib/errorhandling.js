let http = require('http')

function renderError (err, res) {
  console.log('error is >> ', err)
  res.format({
    'text/html': function () {
      res.render('error.html', err)
    },
    'application/json': function () {
      res.json({message: err.message })
    },
    'default': function () {
      res.send(err.message)
    }
  })
}

module.exports.errorHandler = function (err, req, res, next) {
  // jshint unused:lets
  console.log('error is >> ', err)
  if (typeof err === 'string') {
    console.error("You're passing a string into next(). Go fix this: %s", err)
  }

  let error = {
    message: err.message ? err.message.toString() : err.toString(),
    status: http.STATUS_CODES[err.status] ? err.status : 500
  }

  res.status(error.status)
  renderError(error, res)
}

module.exports.pageNotFoundHandler = function (req, res) {
  console.log('error is >> ', err)
  let err = {
    message: req.gettext('You found a loose thread!'),
    status: 404
  }

  res.status(err.status)
  renderError(err, res)
}

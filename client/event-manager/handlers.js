'use strict'

var handlers = {}
handlers['login'] = {}

let filterData = (passedValues) => {
  let passData = {}
  for (let i in passedValues) {
    if (passedValues[i]['type'] === 'dom') {
      passData[passedValues[i]['key']] = document.querySelector('[data-is="login"] ' + passedValues[i]['selector'])['value']
    }
  }
  return passData
}

// TODO :: PIECE#2 HANDLER OBJECT, MAKE THIS PICKABLE FROM A DIFFERNT FILE
handlers['login'].handleLogin = function (data, cb, event) {
  data = filterData(data)
  console.log(this)
  if (data.userId === 'saurshaz' && data.userPassword === 'password') {
    this.userId === ' '
    this.userPassword === ' '
    this.global = this.global || {}
    this.global.authStatus = true
    this.me = data.userId
  } else {
    this.global.authStatus = false
  }

  this.authStatus = this.authStatus ? 'logged In' : ' Logged Out'
  cb(null, this)
}

handlers['login'].handleResetLogin = function (data, cb, event) {
  data = filterData(data)
  this.userId = ' '
  this.userPassword = ' '
  this.global = this.global || {}
  this.global.authStatus = true
  this.global.authStatus = this.global.authStatus ? 'logged In' : ' Logged Out'
  console.log(this)
  cb(null, this)
}

module.exports = handlers

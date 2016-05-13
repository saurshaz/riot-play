'use strict'

var handlers = {}
handlers['login'] = {}

let filterData = (passedValues, module) => {
  let passData = {}
  for (let i in passedValues) {
    if (passedValues[i]['type'] === 'dom') {
      passData[passedValues[i]['key']] = document.querySelector('[data-is="' + module + '"] ' + passedValues[i]['selector'])['value']
    }
  }
  return passData
}

handlers['login'].handleLogin = function (data, store, cb, event) {
  data = filterData(data, 'login')
  console.log(this)
  if (data.userId === 'saurshaz' && data.userPassword === 'password') {
    store.setState('user', 'userId', '')
    store.setState('user', 'userPassword', '')
    store.setState('user', 'me', data.userId)
    store.setState('user', 'authStatus', true)
  } else {
    store.setState('user', 'userId', data.userId)
    store.setState('user', 'userPassword', data.userPassword)
    store.setState('user', 'me', data.userId)
    store.setState('user', 'authStatus', false)
  }
  cb(null, this)
}

handlers['login'].handleResetLogin = function (data, store, cb, event) {
  data = filterData(data)
  store.setState('user', 'userId', '')
  store.setState('user', 'userPassword', '')
  store.setState('user', 'authStatus', false)
  console.log(this)
  cb(null, this)
}

module.exports = handlers

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
  let context = this
  data = filterData(data, 'login')
  console.log(this)
  if (data.userId === 'saurshaz' && data.userPassword === 'password') {
    store.setState('user', 'userId', '')
    store.setState('user', 'userPassword', '')
    store.setState('user', 'me', data.userId)
    store.setState('user', 'authStatus', true)
  // todo : the screen shall ideally change now
  } else {
    store.setState('user', 'userId', data.userId)
    store.setState('user', 'userPassword', data.userPassword)
    store.setState('user', 'me', data.userId)
    store.setState('user', 'authStatus', false)
  }
  cb(null, this)
}

handlers['login'].handleResetLogin = function (data, store, cb, event) {
  let context = this
  data = filterData(data)
  store.setState('user', 'userId', '')
  store.setState('user', 'userPassword', '')
  store.setState('user', 'authStatus', false)
  cb(null, this)
}

handlers['login'].validate = function (data, store, cb, event) {
  let context = this
  let result = true
  let self = context

  let userInput = self.root.querySelector('#userid')
  let passwordInput = self.root.querySelector('#password')
  let repeatPasswordInput = self.root.querySelector('#repeatPassword')

  //  todo :: use a validation lib here
  //  add messages also, display messages at a common place
  if (!userInput.value || !userInput.value.trim()) {
    userInput.style = 'border-bottom-color:red;'
    result = false
    self.update()
  } else {
    userInput.style = 'border-bottom-color:green;'
    self.update()
  }

  if (!passwordInput.value || !passwordInput.value.trim()) {
    passwordInput.style = 'border-bottom-color:red;'
    result = false
    self.update()
  } else {
    if (!repeatPasswordInput.value || !repeatPasswordInput.value.trim()) {
      repeatPasswordInput.style = 'border-bottom-color:red;'
      result = false
      self.update()
    } else {
      if (repeatPasswordInput.value.trim() !== passwordInput.value.trim()) {
        repeatPasswordInput.style = 'border-bottom-color:red;'
        passwordInput.style = 'border-bottom-color:red;'
        result = false
        self.update()
      } else {
        passwordInput.style = 'border-bottom-color:green;'
        repeatPasswordInput.style = 'border-bottom-color:green;'
        self.update()
      }
    }
  }
  store.setState('user', 'loginform', {validated: result})
}

module.exports = handlers

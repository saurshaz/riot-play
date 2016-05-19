'use strict'

import Fyler from '../components/js/Fyler'

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

// fylerclient 
handlers['fylerclient'] = {}
handlers['fylerclient'].onmount = function (data, store, cb, event) {
  let self = this
  document.querySelector('[data-is="' + data.page + '"] ' + '#json_change_div').style.display = 'none'
  document.querySelector('[data-is="' + data.page + '"] ' + '#json_output_div').style.display = 'block'

  let original_json = {'my_name': 'saurshaz'}
  let requestjson = {
    'config': {
      'how': 'sync',
      'where': 'server',
      'lookat': 'context'
    },
    'commands': [ {
      'what': 'utils',
      'handler': 'echo',
      'input': original_json
    } ]
  }
  store.setState(data.domain, 'requestjson', requestjson)
  store.setState(self.opts.domain, 'request', JSON.stringify(requestjson, null, 4))
}

handlers['fylerclient'].changeRequest = function (data, store, cb, event) {
  let self = this
  data.requestjson = JSON.parse(document.querySelector('[data-is="' + data.page + '"] ' + '#requestId').value) // todo :: validation of JSON as user types
  store.setState(data.domain, 'request', JSON.stringify(data.requestjson, null, 4))
  store.setState(data.domain, 'requestjson', data.requestjson)
  document.querySelector('[data-is="' + data.page + '"] ' + '#json_change_div').style.display = 'none'
  document.querySelector('[data-is="' + data.page + '"] ' + '#json_output_div').style.display = 'block'
  document.querySelector('[data-is="' + data.page + '"] ' + '#changeRequestBtn').style.display = 'block'
}

handlers['fylerclient'].showChangeRequestForm = function (data, store, cb, event) {
  let self = this
  document.querySelector('[data-is="' + data.page + '"] ' + '#json_change_div').style.display = 'block'
  document.querySelector('[data-is="' + data.page + '"] ' + '#json_output_div').style.display = 'none'
  document.querySelector('[data-is="' + data.page + '"] ' + '#changeRequestBtn').style.display = 'none'
}

handlers['fylerclient'].makeCall = function (data, store, cb, event) {
  let self = this
  Fyler.run(store.getState(data.domain, 'requestjson'), function (err, res) {
    store.setState(data.domain, 'response', JSON.stringify(res, null, 4))
    store.setState(data.domain, 'err', err)
  })
}

module.exports = handlers

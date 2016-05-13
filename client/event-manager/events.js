'use strict;'

import handlers from './handlers'
import store from './store'

let eventsConfig = {}
eventsConfig.setupEvents = (context) => {
  // riot.mount('*')
  let domain = context.opts.domain
  let page = context.opts.page

  if (domain && page) {
    for (let idx in eventsConfig[page]) {
      let event_json = eventsConfig[page][idx]
      let handler = event_json.handler
      context.root.querySelector('[data-is="' + context.root.getAttribute('data-is') + '"] ' + event_json.selector).addEventListener(event_json.event, handlers[page][handler].bind(context._, event_json.passedValues, store, (err, result) => {
        context.update()
        console.log('err -> ', err, ' result-> ', context._)
      }))
    }
  }
}

// login components config
eventsConfig.login = []
eventsConfig.login.push({
  selector: 'button#submitLogin',
  event: 'click',
  signal: '',
  handler: 'handleLogin',
  state: self._,
  passedValues: [{
    type: 'dom',
    key: 'userId',
    selector: 'input#userid',
  }, {
    type: 'dom',
    key: 'userPassword',
    selector: 'input#password',
  }]
})

eventsConfig.login.push({
  selector: 'button#resetLogin',
  event: 'click',
  signal: '',
  handler: 'handleResetLogin',
  state: self._,
  passedValues: []
})

module.exports = eventsConfig

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
      context.root.addEventListener(event_json.event, (e) => {
        if (e.target.nodeName === event_json.selector.nodename && e.target.id === event_json.selector.nodeid) {
          handlers[page][handler].call(context._, event_json.passedValues, store, (err, result) => {
            context.update()
            console.log('err -> ', err, ' result-> ', context._)
          })
        }
      })
    }
  }
}

// login components config
eventsConfig.login = []
eventsConfig.login.push({
  selector: {
    nodename: 'BUTTON',
    nodeid: 'submitLogin'
  },
  event: 'click',
  signal: '',
  handler: 'handleLogin',
  passedValues: [{
    type: 'dom',
    key: 'userId',
    selector: 'input#userid'
  }, {
    type: 'dom',
    key: 'userPassword',
    selector: 'input#password'
  }]
})

eventsConfig.login.push({
  selector: {
    nodename: 'BUTTON',
    nodeid: 'resetLogin'
  },
  event: 'click',
  signal: '',
  handler: 'handleResetLogin',
  passedValues: []
})

module.exports = eventsConfig

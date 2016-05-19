'use strict;'

import handlers from './handlers'
import store from './store'
import PubSub from './pubsub'

let eventsConfig = {}

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

// fylerclient components config
eventsConfig.fylerclient = []
eventsConfig.fylerclient.push({
  selector: {
    nodename: 'SECTION',
    nodeid: 'fylerclient'
  },
  event: 'load',
  signal: '',
  handler: 'onmount',
  passedValues: []
})

eventsConfig.fylerclient.push({
  selector: {
    nodename: 'BUTTON',
    nodeid: 'makeCallBtn'
  },
  event: 'click',
  signal: '',
  handler: 'makeCall',
  passedValues: []
})

eventsConfig.fylerclient.push({
  selector: {
    nodename: 'BUTTON',
    nodeid: 'changeRequestBtn'
  },
  event: 'click',
  signal: '',
  handler: 'showChangeRequestForm',
  passedValues: []
})

eventsConfig.fylerclient.push({
  selector: {
    nodename: 'BUTTON',
    nodeid: 'btnChangeRequest'
  },
  event: 'click',
  signal: '',
  handler: 'changeRequest',
  passedValues: []
})

function setupEvents (data) {
  let context = data.context
  let domain = context.opts.domain || data.domain
  let page = context.opts.page || data.page
  console.debug('setupEvents::  domain > ', domain, ' page > ', page)
  if (domain && page) {
    for (let idx in eventsConfig[page]) {
      let event_json = eventsConfig[page][idx]
      let handler = event_json.handler
      context.root.addEventListener(event_json.event, (e) => {
        if (e.target.nodeName === event_json.selector.nodename && e.target.id === event_json.selector.nodeid) {
          event_json.passedValues['page'] = page
          event_json.passedValues['domain'] = domain
          handlers[page][handler].call(context._, event_json.passedValues, store, (err, result) => {
            context.update()
            console.log('err -> ', err, ' result-> ', context._)
          })
        }
      })
    }
  }
}

function destroyEvents (data) {
  let context = data.context
  let domain = context.opts.domain
  let page = context.opts.page
  if (domain && page) {
    for (let idx in eventsConfig[page]) {
      let event_json = eventsConfig[page][idx]
      let handler = event_json.handler
      context.root.removeEventListener(event_json.event) // todo :: test
      context.update()
    }
  }
}

function setupAllEventHooks (data) {
  let element = data.context.root.getAttribute('data-is')
  // PubSub.subscribe(element + '_setup_events', (data) => {
  setupEvents(data)
// })
// PubSub.subscribe(element + '_destroy_events', (data) => {
//   destroyEvents(data)
// })
}

PubSub.subscribe('setup_all_events', (data) => {
  setupAllEventHooks(data)
})

module.exports = eventsConfig

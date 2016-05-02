'use strict'
let global = {}
global.app = {
  home_message: 'Hi from the home masterpiece'
}

PubSub.subscribe('context_update_init', (data) => {
  console.log('*** context updated ***')
  // debugger
  global.app.home_message = data.data
  PubSub.publish('context_updated', { global: { app: { home_message: global.app.home_message } } })
})

module.exports = global

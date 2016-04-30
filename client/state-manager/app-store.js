import riot from 'riot'
import EVT from './event_constants'

var AppStore = function AppStore () {
  if (!(this instanceof AppStore)) return new AppStore()

  var self = this

  riot.observable(self)
  self.events = []
  let _defaults = {}

  // utility function
  self.setState = function (update_obj) {
    for (var key in update_obj) {
      self[key] = update_obj[key]
    }
  }

  // loaded-chat-panel event handler
  self.on(EVT.INIT_CONTAINER, function (data) {
    console.log('STARTED CONTAINER')
    self.state = _defaults

    if (!self.state.socket && self.state.userProviderName) {
      // simulate delay
      setTimeout(function () {
        riot.control.trigger(EVT.SESSION_STARTED, self.state)
      }, 1000)
    } else {
      riot.control.trigger(EVT.AUTH_NEEDED, {authstatus: false})
    }
  })
}

module.exports = AppStore

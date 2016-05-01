import riot from 'riot'
import EVT from './event_constants'
// import pubsub from './pubsub.js'

var AppActions = function (component) {
  if (!(this instanceof AppActions)) return new AppActions()

  var self = this

  return {
    handleMyCLick: (config_data) => {
      console.log('todo :: handle my click action here and get done')
      PubSub.publish(EVT.MY_CLICK_DONE_SUCCESS, {data: {a: 'b'},config_data: config_data})
    },
    init: (component) => {
      console.log('**** initializing App Actions ****')
      console.log('**** component is ', component, ' *****')
    },
    fetchApps: function (userid) {
      PubSub.publish(EVT.FETCH_APPS_SUCCESS, {userid: userid})
    }
  }

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
  PubSub.subscribe(EVT.INIT_CONTAINER, function (data) {
    console.log('STARTED CONTAINER')
    self.state = _defaults

    if (!self.state.socket && self.state.userProviderName) {
      // simulate delay
      setTimeout(function () {
        PubSub.publish(EVT.SESSION_STARTED, self.state)
      }, 1000)
    } else {
      PubSub.publish(EVT.AUTH_NEEDED, {authstatus: false})
    }
  })
}

module.exports = AppActions

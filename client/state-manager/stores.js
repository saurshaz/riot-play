import riot from 'riot'
import EVT from './event_constants'

var AppStore = function () {
  if (!(this instanceof AppStore)) return new AppStore()

  var self = this

  console.log('initializing stores ... ')

  let storeData = {
    __state__: this.state,
    myClickDoneHandler: (e, data) => {
      console.log('todo :: handle my click done store part here and get the change in state done')
      // pubsub.trigger(EVT.AUTH_DONE, {authstatus: true})
      // first param below is the `APP` store identifier where change is coming from
      // second one is the change that is coming to be updated
      self.state.authstatus = true
      PubSub.publish(EVT.APP_STATE_CHANGED, [{authstatus: self.state.authstatus}])
    },
    handleAppsFetch: (e, data) => {
      console.log('todo :: handle if anything to be updated post fetching apps')
      // pubsub.trigger(EVT.AUTH_DONE, {authstatus: true})
      // first param below is the `APP` store identifier where change is coming from
      // second one is the change that is coming to be updated
      setTimeout(() => {
        self.state.authstatus = true

        // TODO :: ATTACH ANY 3rd party service to load data
        self.state.app_items = [{app_name: 'rioter-one',app_id: '1'}, {app_name: 'rioter-two',app_id: '2'}, {app_name: 'rioter-three',app_id: '3'}]
        PubSub.publish(EVT.APP_STATE_CHANGED, [{authstatus: self.state.authstatus}, {app_items: self.state.app_items}])
      // PubSub.publish(EVT.APP_STATE_INIT, this.state)
      }, 1000)
    }
  }

  // TODO :: MAKE THIS PICKED FROM CONFIG OF SOME SORT
  PubSub.subscribe(EVT.MY_CLICK_DONE_SUCCESS, storeData.myClickDoneHandler)
  PubSub.subscribe(EVT.FETCH_APPS_SUCCESS, storeData.handleAppsFetch)
  this.state = {}
  this.state.authstatus = false
  this.state.user_name = ''
  this.state.mode = ''
  this.state.selected_app = ''
  this.state.selected_app_name = ''
  this.state.created_app = ''
  this.state.created_app_name = ''
  this.state.app_items = []

  // send initial state to view
  PubSub.publish(EVT.APP_STATE_INIT, this.state)

  return storeData

  riot.observable(self)
  self.events = []
  let _defaults = {}

  // utility function
  self.setState = function (update_obj) {
    for (var key in update_obj) {
      self.state[key] = update_obj[key]
    }
  }

  // loaded-chat-panel event handler
  PubSub.subscribe(EVT.INIT_CONTAINER, (data) => {
    console.log('STARTED CONTAINER')
    self.state = _defaults

    if (!self.state.socket && self.state.userProviderName) {
      // simulate delay
      setTimeout(function () {
        PubSub.publish(EVT.SESSION_STARTED, self.state)
      }, 1000)
    } else {
    }
  })
}

module.exports = AppStore

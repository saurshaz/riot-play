'use strict'

import events from '../events'
import store from '../store'
import PubSub from '../pubsub'

module.exports = {
  // init method is a special one which can initialize
  // the mixin when it's loaded to the tag and is not
  // accessible from the tag its mixed in
  init: function (stores) {
    // this.on('updated', function () { console.log('Updated!') })
    let self = this
    self.state = store.init()
    self._ = self.state

    self.on('mount', function () {
      // todo : try to get this stores from init param only
      self.stores.map((item, i) => {
        PubSub.subscribe(item + '_updated', (data) => {
          console.log(' update data >>> ', data)
          self['_'][data.module][data.key] = data.val
          self.update()
        })
      })
      events.setupEvents(self)
    })
  }
}

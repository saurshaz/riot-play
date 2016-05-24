'use strict'
import events from '../events'
import riot from 'riot'
import PubSub from '../pubsub'
const _cookies = require('cookies-js')(window)

// upon load - read the cookie, and bring it's value into `self._.user.loggedin` and `self._.user.applerac`
module.exports = {
  // init method is a special one which can initialize
  // the mixin when it's loaded to the tag and is not
  // accessible from the tag its mixed in
  init: function (stores) {
    let self = this

    // self._ shall already be existing, if not skip
    if (!self._) {
      self._ = {}
    }
    self._.authenticate = function () {
      if (!self._.user.loggedin && (self._.user.loggedin !== 'false') && !self._.user.applerac) {
        console.debug(' ****  ', currentUri)
        let currentUri = self.currentLocation = document.location.origin + document.location.pathname + document.location.search

        // could be that cookies are present but not in store values
        if (_cookies.get('applerac') && _cookies.get('loggedin')) {
          PubSub.publish('auth-done', ({applerac: _cookies.get('applerac'), loggedin: _cookies.get('loggedin')}))
        } else {
          // todo :: rm this hardcoding for auth-service url
          __AUTH_SERVICE_URL = 'http://saurabhs-macbook-air.local:5000/ed?apid=appler&apto='
          // or  it could be that auth has not happened on the Fyler server at all
          document.location.href = __AUTH_SERVICE_URL + currentUri
        }
      }
    }
  }
}

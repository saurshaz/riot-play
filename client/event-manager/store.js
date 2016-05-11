'use strict'
let PubSub = require('../../public/scripts/pubsub.js')
// todo :: implement universal state here
// make the change in needed JSOn and then emit an update change for that store

// todo :: restrict property access without `setState`
let state = {
  global: {}, user: {authStatus: false}, misc: {}
}

module.exports = function () {
  return {
    init: function () {
      return state
    },
    setState: function (module, key, val) {
      state[module][key] = val
      PubSub.publish(module + '_updated', {module: module,key: key,val: val, state: state})
    },
    getState: function (storeName_key) {
      if (!storeName_key) {
        return state
      }

      // make the change in needed JSOn and then emit an update change for that store
      let module = storeName_key.split('.')[0]
      let key = storeName_key.split('.')[1]
      return state[module][key]
    },
    register: function (storeName_key, val) {
      let arr_state = []
      if (typeof storeName_key !== 'object') {
        arr_state.push(storeName_key)
      }

      for (let i in arr_state) {
        // make the change in needed JSOn and then emit an update change for that store
        let module = arr_state[i].split('.')[0]
        let key = arr_state[i].split('.')[1]
        state[module] = state[module] || {}
        state[module][key] = val
      }
    }
  }
}()

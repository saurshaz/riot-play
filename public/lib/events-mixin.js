module.exports = {
  // init method is a special one which can initialize
  // the mixin when it's loaded to the tag and is not
  // accessible from the tag its mixed in
  init: function () {
    this.on('updated', function () { console.log('Updated!') })
  },

  getOpts: function () {
    return this.opts
  },

  log: function (obj) {
    console.dir('me again logging')
  },

  setOpts: function (opts, update) {
    this.opts = opts
    if (!update) this.update()
    return this
  },

  updateMe: function (changeArr) {
    let self = this
    console.log('****** setting changed state *********', changeArr)
    for (var i in changeArr) {
      var obj = changeArr[i]
      var key = Object.keys(obj)[0]
      self[key] = obj[key]
    }
    self.update()
  },
  initState: function (state) {
    let self = this
    console.log('****** setting initial state *********', state)
    self.update()
  }
}

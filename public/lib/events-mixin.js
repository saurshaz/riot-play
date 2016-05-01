riot.mixin(EventsMixin , {
  init: function () {
    this.on('updated', function () { console.log('Updated!') })
  },

  getOpts: function () {
    return this.opts
  },

  setOpts: function (opts, update) {
    this.opts = opts
    if (!update) this.update()
    return this
  },
  updateMe: function (changeArr) {
    console.log('****** setting changed state *********', changeArr)
    for (var i in changeArr) {
      var obj = changeArr[i]
      var key = Object.keys(obj)[0]
      self[key] = obj[key]
    }
    self.update()
  },
  initState: function (state) {
    console.log('****** setting initial state *********', state)
    self.update()
  }
})

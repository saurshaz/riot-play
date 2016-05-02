var self = this
self.data = {
  first: 'This is the help for the first page.',
  second: 'This is the help for the second page.'
}

var r = riot.route.create()
r('*', function (id) {
  self.helptext = self.data[id] || 'Help not found.'
  self.update()
})
r(function () {
  self.helptext = 'Click the navigation on the left edge.'
  self.update()
})

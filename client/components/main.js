var self = this
self.app = state.app // sharing global space (consider store)
self.title = "Now it's loading..."
self.body = ''
self.data = [
  { id: 'apple', title: 'Apple', body: 'The world biggest fruit company.' },
  { id: 'orange', title: 'Orange', body: "I don't have the word for it..." }
]

PubSub.subscribe('context_updated', (data) => {
  console.log('updating ')
  self.update()
})

self.changeData = function changeData () {
  self.data = {data: new Date()}
  PubSub.publish('context_update_init', self.data)
}

var r = riot.route.create()
r('/#', home)
r('/#first', first)
r('/#first/*', firstDetail)
r('/#second', second)
r(home) // `notfound` would be nicer!

function home () {
  self.update({
    title: 'Home of the great app',
    body: 'The Timeline or dashboard as you like!',
    isFirst: false
  })
}
function first () {
  self.update({
    title: 'First feature of your app',
    body: 'It could be a list of something for example.',
    isFirst: true
  })
}
function firstDetail (id) {
  var selected = self.data.filter(function (d) { return d.id == id })[0] || {}
  self.update({
    title: selected.title,
    body: selected.body,
    isFirst: false
  })
}
function second () {
  self.update({
    title: 'Second feature of your app',
    body: 'It could be a config page for example.',
    isFirst: false
  })
}

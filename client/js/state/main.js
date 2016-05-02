var self = this
self.app = state.app // sharing global space (consider store)
self.title = "Now it's loading..."
self.body = ''
self.items = [
  { id: 'apple', title: 'Apple', body: 'The world biggest fruit company.' },
  { id: 'orange', title: 'Orange', body: "I don't have the word for it..." }
]

PubSub.subscribe('context_updated', function (data) {
  console.log('updating ')
  self.update()
})

self.changeData = function changeData () {
  PubSub.publish('context_update_init', {today: new Date()})
}

self.update()

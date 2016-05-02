var riot = require('riot')
// riot-creator-mixin.js
riot.mixin('riotCreatorMixin', {
  createRiotElement: function (elName, markup, innerMarkup, riot, eventsconfig, id, visibleviews) {
    var structure = {
      name: elName,
      markup: markup,
      init: function (riot) {
        riot.html(elName, innerMarkup, function (opts) {
          var self = this

          // / attach signal emitting to the element provided upon the provided event
          function _activateEventsEach (_target, riot, _action) {
            if (_action.domeventtype === 'load') {
              riot.control.trigger(_action.emitsignal, _action.emitdata)
            } else {
              _target.parentElement.addEventListener(_action.domeventtype, function (e) {
                riot.control.trigger(_action.emitsignal, _action.emitdata)
              })
            }
          }

          // / attach catching a signal and either emitting another signal or invoking a function upon on provided event
          function _activateSignalsEach (_target, riot, _signal) {
            // handle signal catching and and invoking handler
            if (_signal && _signal.catch && _signal.function) {
              riot.control.on(_signal.catch, function (data) {
                window[_signal.function](self, data)
              })
            }

            // handle signal catching and and another signal emitting 
            if (_signal && _signal.catch && _signal.emitsignal) {
              riot.control.on(_signal.catch, function () {
                riot.control.trigger(_signal.emitsignal, _action.emitdata)
              })
            }
          }

          function _activateEvents (events_for_id, id) {
            // / handle emitting signals
            for (var i = events_for_id.activate.actions.length - 1; i >= 0; i--) {
              let _action = events_for_id.activate.actions[i]
              let _target = (events_for_id.activate.actions[i].domeventselector) ? self.root.querySelectorAll(events_for_id.activate.actions[i].domeventselector) : self.root.parentElement

              if (_target) {
                if (events_for_id.activate && events_for_id.activate.actions) {
                  // handle dom event and signal emitting 
                  if (_action && _action.emitsignal) {
                    // id, eventtype, eventselector, listenerFunction
                    if (_target instanceof NodeList) {
                      for (var i = 0; i < _target.length; i++) {
                        _activateEventsEach(_target.item(i), riot, _action)
                      }
                    } else {
                      _activateEventsEach(_target, riot, _action)
                    }
                  }
                }
              }

              // / handle listening to emitted signals (from wherever)
              if (events_for_id.activate && events_for_id.activate.signals) {
                for (var i = events_for_id.activate.signals.length - 1; i >= 0; i--) {
                  let _signal = events_for_id.activate.signals[i]
                  let _target = (events_for_id.activate.signals[i].domeventselector) ? self.root.querySelectorAll(events_for_id.activate.signals[i].domeventselector) : self.root.parentElement

                  if (_target) {
                    // handle dom event and signal emitting 
                    if (_signal && _signal.emitsignal) {
                      // id, eventtype, eventselector, listenerFunction
                      if (_target instanceof NodeList) {
                        for (var i = 0; i < _target.length; i++) {
                          _activateSignalsEach(_target.item(i), riot, _signal)
                        }
                      } else {
                        _activateSignalsEach(_target, riot, _signal)
                      }
                    } else if (_signal && _signal.function) {
                      riot.control.on(_signal.catch, (d) => {
                        _signal.function(d)
                      })
                    }
                  }
                }
              }
            }
          }

          // TODO :: BETTER DETACH PROCESS(NOT OPTIMIZED)
          function _suspendEvents (events_for_id) {
            // / handle emitting signals
            if (events_for_id.suspend && events_for_id.suspend.actions) {
              for (var i = events_for_id.suspend.actions.length - 1; i >= 0; i--) {
                let _action = events_for_id.suspend.actions[i]
                let _target = (events_for_id.suspend.actions[i].domeventselector) ? self.root.querySelector(events_for_id.suspend.actions[i].domeventselector) : self.root
                if (_target) {
                  // handle dom event and signal emitting 
                  if (_action && _action.emitsignal) {
                    _target.removeEventListener(_action.domeventtype, function (e) {
                      // riot.control.trigger(_action.emitsignal)
                    })
                  }
                }
              }
            }

            // / handle listening to emitted signals (from wherever)
            if (events_for_id.suspend && events_for_id.suspend.signals) {
              for (var i = events_for_id.suspend.signals.length - 1; i >= 0; i--) {
                let _signal = events_for_id.suspend.signals[i]
                let _target = (events_for_id.suspend.signals[i].domeventselector) ? self.root.querySelector(events_for_id.suspend.actions[i].domeventselector) : self.root

                if (_target) {
                  // handle signal catching and and invoking handler
                  if (_signal && _signal.catch && _signal.function) {
                    // riot.control.on(_signal.catch,window[_signal.function])
                  }

                  // handle signal catching and and another signal emitting 
                  if (_signal && _signal.catch && _signal.emitsignal) {
                    riot.control.on(_signal.catch, function () {
                      // riot.control.trigger(_signal.emitsignal)
                    })
                  }
                }
              }
            }
          }

          self.handleEvents = function (eventsconfig, id) {
            let events_for_id = eventsconfig[id]
            visibleviews.map((viewId) => {
              if (viewId != id) {
                // handle suspended context preparation (events)
                _suspendEvents(eventsconfig[viewId])
              }
              // handle active context preparation (events)
              _activateEvents(eventsconfig[id], id)
            })
          }

          self.on('unmount', function () {
            clearInterval(timer)
          })

          self.on('mount', function () {
            self.handleEvents(eventsconfig, id)
          })

          self.update()
        })
      },
      finalize: function (riot) {
        riot.mount(elName)
      }
    }
    return structure
  }
})

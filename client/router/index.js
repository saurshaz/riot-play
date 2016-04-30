'use strict;'

import riot from 'riot'
import router from 'riot-router'
const projectName = location.pathname.slice(1) || 'home'
import RiotControl from '../../public/lib/riot-control'
import AppStore from '../state-manager/app-store'
let appStore = new AppStore()
RiotControl.addStore(appStore)
riot.control = RiotControl

// we need this to easily check the current route from every component 
riot.routeState = {
  view: ''
}

let self = this
let _views = ['chatapp', 'testapp', 'helloapp', 'riot-app-test', 'home', 'fstag']
let _defaultView = 'fstag'
let _currentView = ''
// Redirect unlogged users to /login page
function processorFilter (request, response, next) {
  // TODO :: HOW CAN PAGES BE READ FROM CONFIGURATION ?
  let view = request.uri.slice(1)
  let extraParams = {header: true,footer: true}
  if (view.indexOf('/') !== -1) {
    // posOfSlash
    view = view.substring(0, (view.indexOf('/') || view.length))
    let replaced = request.uri.replace('/' + view + '/', '')
    let arr = replaced.split('&')
    for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i].split('=') && arr[i].split('=').length === 2) {
        var keyValArr = arr[i].split('=')
        extraParams[keyValArr[0]] = (keyValArr[1]) || ''
      }
    }
  }
  try {
    _currentView = view
    require('../components/' + projectName + '/' + view + '.html')
    let tags = riot.mount('#app', view)
    if (extraParams.header !== 'false') {
      require('../components/' + projectName + '/headertag.html')
      let tagsH = riot.mount('#headertag', 'headertag')
    }
    if (extraParams.footer !== 'false') {
      require('../components/' + projectName + '/footertag.html')
      let tagsF = riot.mount('#footertag', 'footertag')
    }
  } catch(e) {
    console.log(' **** nothing found with >> ', view)
    console.log('details of error ', e)
    next()
  // TODO :: RM THE `views` folder hardcoding.
  } finally {
    next()
  }
}

// Apply security filter to Riot-Router
riot.router.use(processorFilter)

riot.mount('*')
// My app routes
let Route = riot.router.Route,
  DefaultRoute = riot.router.DefaultRoute,
  NotFoundRoute = riot.router.NotFoundRoute,
  RedirectRoute = riot.router.RedirectRoute

riot.router.routes([
  new Route({ tag: 'helloapp' }),
  new Route({ tag: 'fstag' }),
  new DefaultRoute({ tag: 'home' }),
  new RedirectRoute({ from: 'test', to: 'testapp' }),
  new NotFoundRoute({ tag: 'not-found' }),
])
// Start routing
riot.router.start()

'use strict'

import riot from 'riot'
import router from 'riot-router'
import sidenav from '../components/sidenav.html'
import header from '../components/header.html'

window.location.hash = window.location.hash || '#home'

// Redirect unlogged users to /login page
function processorFilter (request, response, next) {
  let view = request.uri.slice(1)
  let extraParams = {domain: true, page: true}
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
    require('../components/' + view + '.html')
    let options = {
      domain: extraParams.domain,
      page: extraParams.page
    }
    riot.mount('#app', view, options)
    // we need this to easily check the current route from every component
    riot.routeState = {
      view: ''
    }
  } catch (e) {
    console.log(' **** error in routing for view  >> ', view)
    console.log('details of error ', e)
    next()
  } finally {
    next()
  }
}

// Apply security filter to Riot-Router
riot.router.use(processorFilter)
riot.mount('*')
// Start routing
riot.router.start()

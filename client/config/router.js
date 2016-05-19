'use strict'

import riot from 'riot'
import router from 'riot-router'

// Redirect unlogged users to /login page
function processorFilter (request, response, next) {
  let view = request.uri.slice(1)
  let extraParams = {domain: true, page: true, pid: true, view: true}
  var replaced = window.location.search.slice(1)
  var arr = replaced.split('&')
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i].split('=') && arr[i].split('=').length === 2) {
      var keyValArr = arr[i].split('=')
      extraParams[keyValArr[0]] = keyValArr[1] || ''
    }
  }

  try {
    view = extraParams.pid || view
    let projectName = extraParams.view || 'home'
    if (projectName) {
      require('../components/' + projectName + '/' + view + '.html')
    } else {
      require('../components/' + view + '.html')
    }
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

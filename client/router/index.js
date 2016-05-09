'use strict;'

import riot from 'riot'
import router from 'riot-router'
const projectName = window.location.pathname.slice(1) || 'home'
// import AppStore from '../state-manager/app-store'
// let appStore = new AppStore()
// RiotControl.addStore(appStore)
// riot.control = RiotControl

let self = this
window.location.hash = window.location.hash || '#home'

// Redirect unlogged users to /login page
function processorFilter (request, response, next) {
  // TODO :: HOW CAN PAGES BE READ FROM CONFIGURATION ?
  let view = request.uri.slice(1)
  let extraParams = {header: true, footer: true}
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
    require('../components/home/' + view + '.html')
    riot.mount('#app', view)
    // we need this to easily check the current route from every component
    riot.routeState = {
      view: ''
    }

  // if (extraParams.header !== 'false') {
  //   require('../components/headertag.html')
  //   riot.mount('#headertag', 'headertag')
  // }
  // if (extraParams.footer !== 'false') {
  //   require('../components/footertag.html')
  //   riot.mount('#footertag', 'footertag')
  // }
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

'use strict'

import riot from 'riot'
import router from 'riot-router'

// Redirect unlogged users to /login page
function processorFilter (request, response, next) {
  let pathArr = location.pathname.split('/')
  // let view = pathArr[5].slice(1)
  let extraParams = {domain: '', page: '', view: '', target: '',fragment: ''}
  var replaced = window.location.search.slice(1)
  var arr = replaced.split('&')
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i].split('=') && arr[i].split('=').length === 2) {
      var keyValArr = arr[i].split('=')
      extraParams[keyValArr[0]] = keyValArr[1] || ''
    }
  }

  try {
    let projectName = pathArr[5].split('.')[0] || 'home'
    if (projectName) {
      require('../components/views/' + projectName + '/' + pathArr[3] + '.html')
    } else {
      require('../components/views/' + pathArr[3].slice(1) + '.html')
    }
    // if (!extraParams.target) {
    let options = {
      domain: pathArr[4],
      page: pathArr[3]
    }
    riot.mount('#app', pathArr[3], options)
    // } else {
    //   extraParams.target = extraParams.target || '#app'
    //   riot.mount(extraParams.target, extraParams.page, options)
    // }

    // we need this to easily check the current route from every component
    riot.routeState = {
      view: ''
    }
  } catch (e) {
    console.log(' **** error in routing for view  >> ', pathArr[3])
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

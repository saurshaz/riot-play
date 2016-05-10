'use strict;'
//  TODO :: PIECE#1 EVENTS MAPPING CONFIG
module.exports = {
  login: [
    {
      selector: 'button#submitLogin',
      event: 'click',
      signal: '',
      handler: 'handleLogin',
      state: self._,
      passedValues: [{
        type: 'dom',
        key: 'userId',
        selector: 'input#userid',
      }, {
        type: 'dom',
        key: 'userPassword',
        selector: 'input#password',
      }]
    },
    {
      selector: 'button#resetLogin',
      event: 'click',
      signal: '',
      handler: 'handleResetLogin',
      state: self._,
      passedValues: []
    }
  ]
}

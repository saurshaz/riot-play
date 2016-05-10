import riot from 'riot'

//  This is the place where events for any components can be registered
//  All components will register these in the appropriate places
// s.e.m.h
const em = {}

// ******* Login-form events registered ******
// load and postload events registration
em['login-form'] = {}
em['login-form']['load'] = [{
  function: function () {
    console.log(' success from login form .. initialized ')
    this.update()
  }
}]

em['login-form']['postload'] = [{
  name: 'process_login_evt_complete',
  function: function (data) {
    // debugger
    console.log(' >>> data ', data)
    if (data.status && (data.status === true)) {
      alert(' Login successful')
    } else {
      alert(' Login failed')
    }
    this.update()
  }
}]

// ******* Login-form events registered ******
// load and postload events registration
em['hello-world'] = {}
em['hello-world']['load'] = [{
  function: function () {
    console.log(' success from hello-world .. initialized ')
    this.update()
  }
}]
em['hello-world']['postload'] = [{
  name: 'process_login_evt_complete',
  function: function (data) {
    if (data.status && (data.status === true)) {
      this.messagestyle = 'color:green;'
      this.message = 'Login successful'
    } else {
      this.messagestyle = 'color:red;'
      this.message = 'Login failed'
    }
    this.update()
  }
}]

module.exports = em

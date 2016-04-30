import riot from 'riot'
import EVT from './event_constants'
import cookie from 'react-cookie'
import utils from '../../public/lib/utils'

var AppStore = function AppStore () {
  if (!(this instanceof AppStore)) return new AppStore()

  riot.observable(this)

  var self = this
  self.events = []

  let _defaults = {
    username: '',
    messages: [],
    oldMessages: [],
    userDisplayName: cookie.load('userDisplayName') ? decodeURIComponent(cookie.load('userDisplayName')) : '',
    userProviderName: cookie.load('userProviderName') ? decodeURIComponent(cookie.load('userProviderName')) : '',
    userProvider: cookie.load('userProvider'),
    socket: '',
    sendVal: '',
    cid: utils.getParameterByName('cid') || '',
    userFriendsArray: cookie.load('user_friends') ? JSON.parse(decodeURIComponent(cookie.load('user_friends'))) : [],
    userproviderId: cookie.load('userproviderId'),
    userProfileImage: cookie.load('userProfileImage') ? decodeURIComponent(cookie.load('userProfileImage')) : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg',
    prepared: false,
    vendorId: '',
    channelName: '',
    channelUrl: '',
    channelText: '',
    linkUrl: '',
    users: [],
  }

  // utility function
  self.setState = function (update_obj) {
    for (var key in update_obj) {
      self[key] = update_obj[key]
    }
  }

  self.on(EVT.GET_USERS_DATA_FOR_CHANNEL, function (data) {
    $.ajax({
      url: '/api/users/' + data.cid,
      cache: false
    }).done(function (users_of_channel) {
      self.state.users = self.state.userDatapassed = users_of_channel
    // riot.control.trigger(EVT.GET_USERS_DATA_FOR_CHANNEL_SUCCESS, users_of_channel)
    })
  })

  self.on(EVT.UPDATE_SCREEN_FOR_CHANNEL, function (message) {
    if (!message.user || message.user !== self.state.userProviderName) {
      self.state.userDatapassed = self.state.userDatapassed || self.state.users || []
      self.state.userDatapassed.push({
        _id: message.vendorId || self.state.vendorId,
        user: message.user || self.state.userProviderName,
        userProfileImage: message.userProfileImage || self.state.userProfileImage,
        vendorId: message.vendorId || self.state.vendorId
      })

      self.state.users = self.state.userDatapassed
      self.state.vendorId = message.vendorId
      self.state.userDatapassed = self.state.userDatapassed
    }

    if (!message.user || message.user === self.state.userProviderName) {
      console.log('>>>>> first >>>message  ', message)
      self.state.messages = self.state.messages || []
      self.state.messages.push({
        user: (message.user || self.state.userProviderName),
        message: (message.user || self.state.userProviderName) + ' joined ... ',
        time: (new Date(message.time) || new Date()).toString('HH:mm:ss'),
        first: true
      })
    // riot.control.trigger(EVT.SCREEN_UPDATE_EVENT, {})
    }
    // debugger
    riot.control.trigger(EVT.UPDATE_SCREEN_FOR_CHANNEL_SUCCESS, self.state)
  })

  self.on(EVT.CHANGE_CHANNEL, function (data) {
    self.state = _defaults
    self.state.messages = []
    renderChannelListeners.call(self , data.cid, false)
  })

  // loaded-chat-panel event handler
  self.on(EVT.INIT_CHAT_CONTAINER, function (data) {
    console.log('STARTED CHAT CONTAINER')
    self.state = _defaults

    if (!self.state.socket && self.state.userProviderName) {
      // debugger
      let $this = self
      self.state.username = (self.state.userProviderName || self.state.userDisplayName || self.state.userDisplayName) || self.username
      // setTimeout(function() {
      renderChannelListeners.call(self , self.state.cid, true)
      console.log('chat container loaded >>> appstate >>>> ', self.state)
      riot.control.trigger(EVT.CHAT_SESSION_STARTED, self.state)
    } else {
      riot.control.trigger(EVT.AUTH_NEEDED, {authstatus: false})
    }
  })
}

function renderChannelListeners (cid, override) {
  let $this = this

  if ($this.state.socket && $this.state.socket.connected) {
    $this.state.socket.close()
  }

  var host = window.location.host
  $this.state.socket = $this.state.socket || io
  $this.state.socket = $this.state.socket.connect('http://' + host, {
    query: 'cid=' + cid + '&selected_text=A random palceholder text generated in place of highlighted text that will be selected from the article. &original_link=http://tadeuzagallo.com/blog/react-native-bridge/'
  })

  $this.state.socket.on('channelCreated', function (msg) {
    // console.log(' channel create ',msg)
    var message = $.evalJSON(msg)
    if (utils.getParameterByName('cid')) {
      if ((utils.getParameterByName('cid') == message.newChannel) && !override) {
        cid = utils.getParameterByName('cid') || message.newChannel
      } else {
        cid = message.newChannel || cid
      }
    } else {
      cid = message.newChannel || cid
    }

    $this.state.channelName = message.newChannel
    $this.state.cid = cid
    $this.state.channelUrl = 'http://' + host + '/?cid=' + message.newChannel
    $this.setState({
      channelName: $this.state.cid,
      channelUrl: $this.state.channelUrl,
      cid: $this.state.channelName
    })

    riot.control.trigger(EVT.UPDATE_SCREEN_FOR_CHANNEL, $this.state)

    if (override) {
      riot.control.trigger(EVT.GET_USERS_DATA_FOR_CHANNEL, {
        cid: $this.state.cid
      })
      riot.control.trigger(EVT.UPDATE_RIGHT_PANEL_FOR_CHANNEL, $this.state)

      if ($this.state && $this.state.username) {
        $.ajax({
          url: '/api/channels/' + $this.state.username,
          data: 'json',
          cache: true
        }).done(function (discussionsList) {
          riot.control.trigger(EVT.UPDATE_DISCUSSIONS_LIST, {discussionsList: discussionsList,cid: $this.state.cid})
        })
      }
    }
  })

  $this.state.socket.on('olderMessagesFound', function (messages) {
    $this.state.oldMessages = messages
    $this.setState({
      oldMessages: $this.state.oldMessages
    })

    $.ajax({
      url: '/api/social_connections',
      data: 'json',
      cache: false
    }).done(function (response) {
      var arr_of_users = []
      if (response.tw) {
        for (var i = response.tw.length - 1; i >= 0; i--) {
          arr_of_users.push({
            username: response.tw[i].screen_name,
            name: response.tw[i].name,
            image: 'http://placekitten.com/25/22'
          })
        }

        $('#message-to-send').mention({
          users: arr_of_users
        })
        riot.control.trigger(EVT.CHAT_SESSION_STARTED, {})
      }
    })
  })

  $this.state.socket.on('chat-' + $this.state.cid, function (msg) {
    var message = $.evalJSON(msg)
    if (message) {
      var action = message.action
      switch (action) {
        case 'message':
          if ($this.state && (message.user !== ($this.state.username))) {
            // console.log("$this.state.username ", $this.state.username)
            var matches
            // someone starts chat with /me ...
            $this.state.messages.push({
              user: message.user,
              message: message.msg,
              time: (new Date()).toString('HH:mm:ss'),
              first: false
            })
            riot.control.trigger(EVT.SCREEN_UPDATE_EVENT, {})
            $this.setState({
              tempVal: ''
            })
            riot.control.trigger(EVT.CHAT_SESSION_STARTED, {})
          }
          break
        case 'control':
          break

      }
    }

    // debugger
    // $("div.chat-history").scrollTop(167 * $("div.chat-history li").length)
    var d = document.querySelector('.chat-history')
    d.scrollTop = d.scrollHeight
  })

  // $this.state.socket.on('authneeded', function(msg) {
  //   console.log(' NO user , please login  ', msg)
  //   $this.setState({
  //     "username": ''
  //   })
  //   $this.setState({
  //     "userProviderName": ''
  //   })
  //   $this.setState({
  //     "userDisplayName": ''
  //   })

//   cookie.remove('user_friends')
//   cookie.remove('userDisplayName')
//   cookie.remove('userProviderName')
//   cookie.remove('userProvider')
//   cookie.remove('userproviderId')
//   cookie.remove('userProfileImage')
// })
}

module.exports = AppStore

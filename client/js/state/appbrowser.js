let self = this
self.mixin(EventsMixin)
self.actions = new AppActions()
self.stores = new AppStores()

self.on('mount', function () {
  self.actions.init('appbrowser')
  // self.setState('app_items', [{app_name: 'rioter-one',app_id: '1'}, {app_name: 'rioter-two',app_id: '2'}, {app_name: 'rioter-three',app_id: '3'}])

  setTimeout(function () {
    $('#app-selector').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    })
  }, 2000)

  // **** configurable-flux-for-riot ****
  // hook up to any changes in the store this view watches
  self.WATCHED_STORES = ['APP', 'USER']

  PubSub.subscribe('APP_STATE_INIT', self.initState) // initialize state
  self.WATCHED_STORES.forEach((item, i) => {
    PubSub.subscribe(item + '_STATE_CHANGED', self.updateMe) // initialize change listener
  })
  self.root.querySelector('#createAppBtn').style.display = 'block'
  self.root.querySelector('#existingAppBtn').style.display = 'block'
  self.root.querySelector('#createAppDiv').style.display = 'none'

  self.actions.fetchApps('saurshaz')
})

// processAppSelect(e){
//   let target =  e.target
//   self.selected_app =target.getAttribute('data-appid')
//   self.selected_app_name = target.innerHTML
//   self.created_app = ''
//   self.created_app_name = ''
//   self.root.querySelector('#appMessageDiv').style.display = 'block'
//   //self.root.querySelector('#createAppBtn').style.display ='none'
//   self.update()
// }

// processAppCreate(e){
//   let target =  e.target
//   self.root.querySelector('#createAppDiv').style.display = 'block'
//   self.root.querySelector('#appMessageDiv').style.display ='none'
//   self.root.querySelector('#existingAppBtn').style.display = 'none'
//   self.update()
// }

// submitAppCreate(e){
//   let target =  e.target
//   self.mode = 'created'
//   self.created_app_name = self.root.querySelector('#createAppInput').value
//   self.created_app ='4'
//   self.selected_app = ''
//   self.selected_app_name = ''
//   self.app_items.push({app_name:self.root.querySelector('#createAppInput').value, app_id:'4'})
//   // TODO :: add logic for above hardcoding removal

//   self.root.querySelector('#appMessageDiv').style.display = 'block'
//   self.root.querySelector('#createAppDiv').style.display = 'none'
//   //self.root.querySelector('#createAppBtn').style.display ='block'
//   self.root.querySelector('#existingAppBtn').style.display = 'block'
//   //debugger
// }

// resetAppCreate(e){
//   let target =  e.target
//   self.mode = ''
//   self.created_app_name = ''
//   self.created_app =''
//   self.selected_app = ''
//   self.selected_app_name = ''
//   self.root.querySelector('#appMessageDiv').style.display = 'block'
//   self.root.querySelector('#createAppDiv').style.display = 'none'
//  // self.root.querySelector('#createAppBtn').style.display ='block'
//   self.root.querySelector('#existingAppBtn').style.display = 'block'
//   //debugger
// }

// processAppSelection(e){
//   let target =  e.target
//   self.mode = 'selected'
//   self.selected_app =target.getAttribute('data-appid')
//   self.selected_app_name = target.getAttribute('data-app_name')
//   self.created_app_name = ''
//   self.created_app =''
//   self.root.querySelector('#createAppDiv').style.display = 'block'
//   self.root.querySelector('#appMessageDiv').style.display ='block'
//   self.root.querySelector('#existingAppBtn').style.display = 'none'
//   self.update()
// }

// processAppDeletion(e){
//   let target =  e.target
//   self.selected_app =target.getAttribute('data-appid')
//   self.selected_app_name = target.innerHTML
//   self.created_app_name = ''
//   self.created_app =''
//   self.root.querySelector('#createAppDiv').style.display = 'block'
//   //self.root.querySelector('#createAppBtn').style.display ='none'
//   self.root.querySelector('#existingAppBtn').style.display = 'none'
//   self.update()
// }

// deleteApp(e){
//   let target =  e.target
//   self[self.mode +'_app'] = target.getAttribute('data-app_id')
//   self[self.mode +'_app_name'] = target.getAttribute('data-app_name')
//   // todo :: add logic to actually remove app
//   debugger
// }

// goToApp(e){
//   let target =  e.target
//   self[self.mode +'_app'] = target.getAttribute('data-app_id')
//   self[self.mode +'_app_name'] = target.getAttribute('data-app_name')
//   // todo :: add logic to actually navigate to that App
//   debugger
// }

// this.mixin(EventsMixin)

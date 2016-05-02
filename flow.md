- views > trigger-events > invoke-handlers > change-state > state-update invoked
- views > watch state > gets updated 


This is what we shall be addressing, nothing else
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|DOM selector|Events|mutator(in userStore.js)|Handler(in userActions.js)|
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|button#login(source is view)|'click'|-X-|handleLogin(probably has a DB check)|
|-X-|'login_success'|updateLoginStatus|-X-|
|button#login(source is view)|'click'|-X-|handleLogin(probably has a DB check)|
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


semh
This shall be built using a config object that can be an array,
[
{}
]

we need to also keep a mapping of v -> stores watched
[{appler-login:['UserStore','AppStore']},{appler-page:['PageStore','AppStore']}]

global stateMap can be a tree structure
{
	global:{user:{name:Saurabh,age:41},page:{headerTagline:'All rocking'},app:{key:'XYS'}}
}

so page.html component can watch only stateChange of global.page and global.app
and login.html component can watch only stateChange of global.user and global.app


the updateChange event has the dual responsibility of 
- making the change in the stateTree
- notifying also what has changed in the state tree


- event + selector => handler (store function) which can again result in signal or a state change
- emit signal => handler (store function) which can again result in signal or a state change
- views watch => state, and pick their state from their only, so any changes are directly reflected.
- views do not directly change state (they do signal -> store -> state change always). This helps other interested views also 


- event + selector publish an event
- views capture 
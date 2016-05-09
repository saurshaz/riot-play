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





# configurable event-management
	- events management
	   - configurable S.E.S.H.V.
		   	- add `selector` for component
		   	- add `event` to listen to
		   	- add `signal` to emit
		   	- add `handler` to declare functions in ( can be folder/files based). handlers invoked on `SE` or `Signal` emission
		   	- `View` would listen to state of interested stores only (which will be mutated via handlers, a tree structure)
		   	- When a component is shared, it shall be isolated (client as well as server) along with all that it needs (tag file, state file) and shall be reusable as is in another project. the flow may come in later visually, but this will be trouble free shall be tested.

	   - shall be framework agnostic(start with riot based)
	   - Old Pub Sub is good.
	   		- Views to not call Handlers directly (always via `Selectors + Events` or `Signals`)
	   - Client side configurable events-management setup
			- shall be possible to declare configuration setup per-component (a JSON)
				- initial `selector + event`/`signal`
				- initial events fired
				- initial state(global state)
				- bindings of other events to `view` layer `selectors` + `events` to `store` handlers
				- bindings of other events to `view` layer `signals` to `store` handlers
				- use global state (component related) for the state binding



sesh
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




functions.md

# requirements
- API methods JSON iput and callback
- multiform upload
- form uploads
- file uploads
- return a stream
- return a HTML buffer




- functions saved and later invoked on demand
- create a function (anywhere, hardcode for now, on client side) and save the function as well as arguments needed
- be able to invoke that function in another context (server context, by doing either of these )
	- an eval of the function text
	- pass on execution to aws lambda/api gateway and get back the response
	- use mongo runtime to run functions
	- any other approach




0 - start in applyx with default `riot-template-starter` code (router, config, client fn, server fn in)
1 - create on applyx `frontend code` for your app
2 - the live editor version on right is rendered via `dyna-editor` reloads
3 - `dyna-editor` makes needed calls from it's `front-end` to it's `server-end` and then to `fyler` to get back data . this app's identity is passed from it's `server side`


1 > 2 > 3 shall go on, and once satisfied ... 

4 - deploy to `AWS` using `deployer` shall happen
5 - once user wants to share from `applyx` to `appler`
	- take in from `front-end` what is shared
	- take in from `server-end` what `non-premium`  is needed (rememeber) functions are modular, and server platform is same, so only references need to be tracked
	- take in user inputs - name, price of the share and create a new entry in `public\shared\<name>`

6 - import of a shared component needs to work in reverse order of share steps

- when user wants to get the source, take all server code and generate a backend , along with frontend and download a project, with `npm start` to kick things off. fyler calls to `premium` services will still go to `platform`






- event + selector publish an event
- views capture 
- views > trigger-events > invoke-handlers > change-state > state-update invoked
- views > watch state > gets updated 


This is what we shall be addressing, nothing else




| DOM Selector | Events | Emit Signal | Handler (has state and logic to change that, emits event at end) | Views Affected |
|--|--|--|--|--|
|   `button#login`   |   `click`    |   `-X-`   | `app.handleLogin` & `login_success` or `login_failure` | `-X-` |
| `-X-`  | `-X-` | `login_success` | `app.stateChanged` | `LoginView`, `HomeView` |
| `-X-`  | `-X-` | `login_failure` | `app.stateChanged` |  `LoginView`, `HomeView` |

# configurable event-management
	- events management
	   - configurable (S.E.WS.AH.SH.ES.V)
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


- event + selector  => handler (store function) which can again result in signal or a state change
- emit signal 		=> handler (store function) which can again result in signal or a state change
- views watch 		=> state, and pick their state from their only, so any changes are directly reflected.
- views do not directly change state (they do signal -> store -> state change always). This helps other interested views also 


every view initializes by calling 
- init events (all triggers), all View > Action
- init state watchers (all on), all Store > View
- write logic for store , and signal emitted







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








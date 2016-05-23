#################################################
## RIOT-PLAY                                   ##
#################################################

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

---------------------------------------------
### About the project
---------------------------------------------
Client Side ES6 has been the standard (app folder)
Server side ES6 usage has been kept to minimal (actually i was also thinking whether i shall be doing this in ES5 only) for purposes of this to be useful to someone (in my team) or otherwise :-)

- to get started
-- Move the `riot-dyna-config` folder to one folder above `riot-dyna` app folder(outside this folder). Edit values in the config files found
For more on ideal directory structure read this `https://gist.github.com/saurshaz/464fcb960c5469e9b271b7ffe5fbe3c6#file-my_node-md`
-- `chmod +x riotserve.sh` to enable script to run `webpack` based front-end code necessary permissions 

-- Do a npm install ```npm i```
- and you shall start the app like 

-- start mongo server (if not already running). `mongod`
-- in 1st terminal tab run `./riotserve` (to serve frontend content with a auto reload watch) `from one directory above the repo directory
-- in 2nd terminal tab run `npm run server`  from the repo directory (to start backend node server)

to start in stage
- `NODE_ENV=prod node server/index.js` for stage (affects env variables loaded)
- the webpack shall not be needed here, so a bundle shall already be generated and referred to in source code


Jump to `http://localhost:6600/home#home` for demo home page
![Demo](/demo.gif)

	
Jump to `http://localhost:6600/view/hello/testapp/fyler/dev.html?p=pane1&cid=appbrowser&a=b&c=d` for testapp page
![Demo](/demo2.gif)
---------------------------------------------
### what it has ?
---------------------------------------------
- expressJS based backend 
- socket.io based websockets implementation
- mongo store based sesssion management
- bunyan powered server logging
- habitat based config management
- riotJS based view layer
- riot control based flux implementation
- configuration based events handling (uses [![ves-flow](https://github.com/saurshaz/ves-flow/)])
- on-the-go components building (using folder based routing and isolated `tester` component)
- webpack based asset packaging
- supports polymer components (utilize the paper components along with riot coolness)
- supports polymer like materialCSS components
- integrate mongo based backend also
- a good neat responsive homepage(build from here)
- riot-router based routing
- /home#testapp?cid=<tagname in app.views dir>&p=<pane selector id>&.....<other params> to test any created component in isolation
- linting based on documented code rules/conventions (jshint and sublimelinter)
- server support for nunjucks templates
- `?footer=false&header=false`querystring params to control header and footer to be appearing
- auth with passport & then jwt token generation (which can be used to manage any REST calls non-dependent on session)


--------------------------------------------------------------------------------------------
#### How a component logic looks ?
--------------------------------------------------------------------------------------------
```
	import StoreWatcher from '../event-manager/mixins/storex'

	<comp1>
		<div>
			<p> Hello World </p>
			.... ... 
		</div>
	</comp1>

	 let self = this

     // for validations
     //  - add a validationform
     //  - add a validate function in the handlers['<tag-name>'] section to set result
     //                into state.<store>.<validationform>.validated property
     self.stores = ['user'] // stores to watch
     self.validationform = ['loginform'] // validation form . this will have validated field

     // for store watching
     // import StoreWatcher from ../../event-manager/mixins/storex
     // self.mixin(StoreWatcher)
     self.mixin(StoreWatcher)
```




--------------------------------------------------------------------------------------------
 ###  More
 ------------------------------------------------------------------------------------------
 project structure can be like (with these special directories and files)
 (for anything that is non-editable .. use comments for now. in future, we may use a better strategy)
 (a linter may be built, based on regex to see if saved copy is good or not. best not to let wrong edit happen)
--------------------------------------------------------------------------------------------
	- server
		- core (visible but non-editable to end-users)
		 	- fn1 
		 	- fn2
		 	....
		- thirdparty (visible and partially editable to end-users)
		 	- fn1
		 	- fn2
		 	....
	- client
	 	- functions
		 	- core (visible but non-editable to end-users)
			 	- fn1
			 	- fn2
		 		....
			- thirdparty (visible and mostly/partially editable to end-users. restrict things that can disturb)
			 	- fn1
			 	- fn2
			 	....
		- components  (visible and totally editable to end-users)
			- a.html
			- b.html
		 	- .....
		- router (visible and partially editable to end-users. based on user's entries app will route)
			- index.js
		- config (visible and editable to end-users. based on user's entries app will initialize)
			- main.js
		- index.html (main file) (visible and partially editable to end-users. based on user's entries app will start)
		- state-manager (visible and partially editable to end-users. based on user's entries app will link to events and data)
			- app-store
			- event_mapping
			- event_constants
	Anything else
	- ...
	- ...




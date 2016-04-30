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
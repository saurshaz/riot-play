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

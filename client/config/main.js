/*
** This file is the entry into the app
** List all different components needed here
** 
*/


// import '../lib/mixins/eh-mixin.js';
// import '../lib/mixins/riot-creator-mixin.js';

require(__dirname+'/../styles/chat.css')
require(__dirname+'/../router')
// var footerTag = require('../views/footerTag.tag);
// create a component - one folder (with a defined set of files) one `identifier`
// create dictionary entries for component in src/global/dictionary file identified by `identifier`
// create a build.properties file which contains 
// 
// 		-> path for all stores needed
// 		-> path for all views needed
// 		-> path for all components needed
// 		-> path for all styles needed
// 
// build triggered with that build.properties file will 
// 	--	generate a folder with perfect folder structure for all things needed and nothing else
//
// all things needed mean -
// 		-> stores
// 		-> view files
// 		-> components
// 		-> dictionary
// 		-> styles
// 		-> index.js (adjusted & generated)
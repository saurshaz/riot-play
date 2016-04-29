'use strict'
let habitat = require('habitat')
if (process.env.NODE_ENV !== 'prod') { // todo :: handle prod and stage
  habitat.load(require('path').resolve(__dirname, '../../../riot-dyna-config/.env'))
} else {
  habitat.load(require('path').resolve(__dirname, '../../../riot-dyna-config/.env.stage'))
}
let env = new habitat()
module.exports = env

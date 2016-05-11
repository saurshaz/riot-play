'use strict'
let habitat = require('habitat')
if (process.env.NODE_ENV !== 'prod') { // todo :: handle prod and stage
  habitat.load(require('path').resolve(__dirname, '../../../riot-play-config/.env')) // todo :: remove this hardcoding `riot-play`
} else {
  habitat.load(require('path').resolve(__dirname, '../../../riot-play-config/.env.stage')) // todo :: remove this hardcoding `riot-play`
}
let env = new habitat()
module.exports = env

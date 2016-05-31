#!/bin/bash

echo starting riot-play!
../node_modules/.bin/webpack-dev-server --port 8098 --host 'saurshaz.xyz' --hot --content-base ./dist/ --config ./webpack/webpack.config.js --hot



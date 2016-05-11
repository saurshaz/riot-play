#!/bin/bash

echo starting riot-play!
../node_modules/.bin/webpack-dev-server --port 8088 --host 'localhost' --hot --content-base ./dist/ --config ./webpack/webpack.config.js --hot

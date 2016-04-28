#!/bin/bash

echo starting riot-applyx!
./node_modules/.bin/webpack-dev-server --port 8088 --host '$1' --hot --content-base ./dist/ --config ./webpack/webpack.config.js --hot

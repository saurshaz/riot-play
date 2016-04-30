var path = require('path')
var webpack = require('webpack')
var outputPath = path.resolve(__dirname, '../dist')
// process.env.HOST='188.166.230.193'
var host = process.env.HOST || '0.0.0.0'
var port = 8088 || parseInt(process.env.PORT, 10) // todo :: rm hardcoding
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// postcss plugins
var cssimport = require('postcss-import')
var customProperties = require('postcss-custom-properties')
var autoprefixer = require('autoprefixer-core')
var csswring = require('csswring')
var cssnested = require('postcss-nested')

module.exports = {
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    'main': [
      // 'webpack/hot/dev-server/app/config/main.js',
      'webpack-dev-server/client?http://' + host + ':' + port + '/main.js', // WebpackDevServer host and port
      'webpack/hot/dev-server?http://' + host + ':' + port + '/main.js', // WebpackDevServer host and port
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/main.js',
      './client/config/main.js'

    ]
  },

  debug: true,
  output: {
    path: outputPath,
    filename: 'main.js',
    publicPath: 'http://' + host + ':' + port + '/'
  },
  module: {
    preLoaders: [{
      test: /\.js|\.html$/,
      exclude: /node_modules/,
      loader: 'riotjs-loader',
      query: {
        modules: 'common'
      }
    }],
    loaders: [{
      test: /\.js|\.html$/,
      exclude: /node_modules/,
      include: /client/,
      loader: 'riotjs-loader',
      query: {
        modules: 'common'
      }
    }, {
      test: /\.js|\.html$/,
      exclude: /node_modules/,
      include: /client/,
      loader: 'babel-loader',
      query: {
        modules: 'common'
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }]
  },
  resolve: {
    extensions: ['', '.react.js', '.js', '.jsx', '.scss'],
    modulesDirectories: [
      'source', 'node_modules'
    ]
  },
  postcss: [cssimport, cssnested, customProperties, autoprefixer, csswring],
  plugins: [
    // extract inline css from modules into separate files
    new webpack.HotModuleReplacementPlugin(),
    // hot reload
    new webpack.IgnorePlugin(/\.json$/),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),
    new webpack.optimize.CommonsChunkPlugin('main', 'main.js'),
    // new ExtractTextPlugin("styles/main.css"),
    new webpack.optimize.UglifyJsPlugin(),
  // new webpack.ProvidePlugin({
  //   riot: 'riot'
  // })
  ],
  progress: true,
// postcss: [
//   require('postcss-import')({ addDependencyTo: webpack }),
//   require('precss')(),
//   require('autoprefixer')({ browsers: 'last 2 versions' })
// ]
}

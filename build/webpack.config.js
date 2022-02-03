
const { join } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function getIPAdress () {
  var interfaces = require('os').networkInterfaces()
  for (var devName in interfaces) {
    var iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '0.0.0.0' && alias.netmask === '255.255.255.0' && !alias.internal) {
        return alias.address
      }
    }
  }
}

module.exports = {
  entry: {
    preview: join(__dirname, '../preview/main.js')
  },
  output: {
    path: join(__dirname, '../lib'),
    publicPath: "/",
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.vue'],
    alias: {
      '@': join(__dirname, '../src'),
      'src': join(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(js|jsx|ts(x?))$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images',
          limit: 10000
        }
      },
      {
        test: /\.(woff|ttf|eot|svg)/,
        loader: 'file-loader?name=font/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: join(__dirname, '../preview/index.html')
    })
  ],
  // 输出的信息
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },
  devServer: {
    contentBase: require('path').join(__dirname, '../dist'),
    compress: true,
    port: 3003,
    hot: true,
    hotOnly: true,
    host: getIPAdress(),
    overlay: true,
    open: true
  }
}

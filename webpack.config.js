const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP_ROOT = path.resolve(__dirname, 'src');

const cssExtractTextPluginParams = JSON.stringify({
  modules: true,
  importLoaders: 1,
  localIdentName: '[name]__[local]__[hash:base64:5]',
});

const SvgSpriteLoaderParams = JSON.stringify({
  name: '[name]_[hash:base64:5]',
  prefixize: true,
});

const isVendor = opts => (
  opts.userRequest &&
  opts.userRequest.indexOf('node_modules') >= 0
);

module.exports = ({ reload } = {}) => {
  const config = {
    entry: {
      main: path.resolve(__dirname, 'src/main.jsx'),
    },
    devtool: '#cheap-source-map',
    output: {
      path: path.join(__dirname, 'dist'),
      pathinfo: true,
      filename: '[name].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel',
            },
          ],
        },
        {
          test: /\.scss$/,
          include: APP_ROOT,
          use: ExtractTextPlugin.extract({
            fallback: 'style',
            use: [
              {
                loader: 'css',
                options: cssExtractTextPluginParams,
              },
              {
                loader: 'postcss',
                options: {
                  plugins() {
                    return [
                      autoprefixer({ browsers: ['last 3 versions'] }),
                    ];
                  },
                },
              },
              {
                loader: 'sass',
                options: {
                  sourceMap: true,
                  data: '@import "_var"; @import "_functions";',
                  includePaths: [
                    path.join(__dirname, 'src/styles'),
                  ],
                },
              },
            ],
          }),
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url?limit=8192',
        },
        {
          test: /\.svg$/,
          loader: 'svg-sprite',
          options: SvgSpriteLoaderParams,
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url?limit=10000&minetype=application/font-woff',
        }, {
          test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file',
        },
      ],
    },
    resolveLoader: {
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
      moduleExtensions: ['-loader'],
    },
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
        'node_modules',
      ],
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.tpl.html'),
        inject: 'body',
        filename: 'index.html',
      }),
      new ExtractTextPlugin({
        filename: 'css/[name].css',
        allChunks: true,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: 'commons/commons.js',
        chunks: [],
        minChunks: isVendor,
      }),
      new CopyWebpackPlugin([
        'src/assets',
      ]),
    ],
    node: {
      fs: 'empty',
    },
  };

  if (reload) {
    config.plugins.push(new LiveReloadPlugin({
      appendScriptTag: true,
    }));
  }

  return config;
};

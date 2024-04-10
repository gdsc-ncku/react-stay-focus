const webpack = require('webpack');
const ejs = require('ejs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const ExtensionReloader = require('webpack-extension-reloader'); //for web extension development
// const { VueLoaderPlugin } = require('vue-loader');
const { version } = require('./package.json');
// const loader = require('mini-css-extract-plugin/types/loader');

const config = {
  mode: process.env.NODE_ENV,
  context: __dirname + '/src',
  entry: {
    'background': './background.js',
    'popup/popup': './popup/popup.js',
    'options/options': './options/options.js',
    // 'goback/goback': './goback/goback.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    // other plugins
    new CopyPlugin({
      patterns: [
        { from: 'icons', to: 'icons', globOptions: { ignore: ['**/icon.xcf'] } },
        { from: 'popup/popup.html', to: 'popup/popup.html'},
        { from: 'options/options.html', to: 'options/options.html'},
        { from: 'images', to: 'images' },
        // { from: 'goback/goback.html', to: 'goback/goback.html'},
        // { from: 'goback/images', to: 'goback/images' },
        {
          from: 'manifest.json',
          to: 'manifest.json',
          transform: (content) => {
            const jsonContent = JSON.parse(content);
            jsonContent.version = version;
  
            if (config.mode === 'development') {
              jsonContent.name = `DEV - ${jsonContent.name}`;
              console.log(jsonContent.name);
              jsonContent['content_security_policy'] = "script-src 'self' 'unsafe-eval'; object-src 'self'";
            }
  
            return JSON.stringify(jsonContent, null, 2);
          },
        },
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:  {
          loader: 'babel-loader', 
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
      }
    },
    {
      test: /\.(css)$/,
      exclude: /node_modules/,
      use:  [MiniCssExtractPlugin.loader, 'css-loader']
  }
      // ... other rules
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // ... other plugins
  ]
};

module.exports = config;
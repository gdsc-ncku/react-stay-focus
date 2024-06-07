const webpack = require('webpack');
const ejs = require('ejs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const ExtensionReloader = require('webpack-extension-reloader'); //for web extension development
// const { VueLoaderPlugin } = require('vue-loader');
const { version } = require('./package.json');
// const loader = require('mini-css-extract-plugin/types/loader');
const arv = process.argv;
const isProd = arv.mode !== 'development';
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
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use:  {
          loader: 'babel-loader', 
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          }
      }
    },
    {
      test: /\.(css)$/,
      exclude: /node_modules/,
      use:  [MiniCssExtractPlugin.loader, 'css-loader']
  },
  {
    test: /\.scss$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
  },
  {
    test: /\.sass$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader?indentedSyntax'],
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: '/images/',
      emitFile: false,
      esModule: false,
    },
  },
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: '/fonts/',
      emitFile: false,
    },
  }
      // ... other rules
    ],
  },
  plugins: [
    // other plugins
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'icons', to: 'icons', globOptions: { ignore: ['**/icon.xcf'] } },
        { from: 'popup/popup.html', to: 'popup/popup.html', transform: transformHtml},
        { from: 'options/options.html', to: 'options/options.html', transform: transformHtml},
        { from: 'images', to: 'images' },
        // { from: 'goback/goback.html', to: 'goback/goback.html', transform: transformHtml},
        { from: 'goback/images', to: 'goback/images' },
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
    new webpack.DefinePlugin({
      ['process.env.API_URL']: JSON.stringify('https://api.wakatime.com/api/v1'),
      ['process.env.CURRENT_USER_API_URL']: JSON.stringify('/users/current'),
      ['process.env.HEARTBEAT_API_URL']: JSON.stringify('/users/current/heartbeats'),
      ['process.env.LOGOUT_USER_URL']: JSON.stringify('https://wakatime.com/logout'),
      ['process.env.NODE_ENV']: JSON.stringify(isProd ? 'production' : 'development'),
      ['process.env.SUMMARIES_API_URL']: JSON.stringify('/users/current/summaries'),
    })
  ],
};

function transformHtml(content) {
  return ejs.render(content.toString(), {
    ...process.env,
  });
}

module.exports = config;
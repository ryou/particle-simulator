const path = require('path');
const webpack = require('webpack');

/* 環境設定ロード
----------------------------------------------------------*/
const env = {
  host: 'localhost',
  port: 8080,
};
try {
  const localEnv = require('./.env'); // eslint-disable-line global-require
  Object.assign(env, localEnv);
} catch (e) {
  switch (e.code) {
    case 'MODULE_NOT_FOUND':
      console.log('.envファイルが存在しません。デフォルトの設定で起動します。');
      break;
    default:
      throw e;
  }
}

module.exports = {
  entry: {
    bundle: './src/webpack/main.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/assets'),
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  data: '@import "_init";',
                  includePaths: [
                    path.resolve(__dirname, 'src/webpack/scss/_imports'),
                  ],
                },
              },
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]',
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          /* TODO: 以下に関して調査
           * 公式に記載の書き方にも関わらず。ここが有効だとエラーが発生
           * https://github.com/babel/babel-loader
           */
          // options: {
          //   presets: [
          //     '@babel/preset-env',
          //   ],
          // },
        },
      },
    ],
  },
  // webpack-dev-serverのオプション
  // 詳細は以下
  // https://webpack.js.org/configuration/dev-server/#devserver
  devServer: {
    contentBase: path.join(__dirname, 'src/static'),

    // index.htmlのみのSPAの際に「http://hoge.com/user/status」的なURLにアクセスがあった場合
    // 当然404エラーを通常返す
    // そういう場合にindex.htmlを呼び出させる場合はtrue
    historyApiFallback: true,

    // webpackによりコンパイルされたファイルが配置されるディレクトリ
    // 「publicPath: '/assets/'」の場合「http://hoge.com/assets/bundle.js」みたいな感じで出力される
    publicPath: '/assets/',

    host: env.host,
    port: env.port,
  },
};

// 以下の記述はvue-cliで使用出来るtemplateを参考にした
// https://github.com/vuejs-templates/webpack-simple/blob/master/template/webpack.config.js
if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({

    }),
  ]);
}

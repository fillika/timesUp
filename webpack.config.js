const path = require('path');
const fs = require('fs');
const isDev = process.env.NODE_ENV === 'development';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const testFolder = path.resolve(__dirname, './src/entryPoints/');
const entry = {};

fs.readdirSync(testFolder).forEach(file => {
  if (file) {
    entry[file] = [path.resolve(__dirname, `./src/entryPoints/${file}/index.ts`)];
  }
});

const splitChunks = isDev
  ? false
  : {
    /**
     * Мы можем разделить библиотеки вручную. Для это пишем, внутри регулярных выражений какие библиотеки нам нужны
     * Например, мы можем добавить несколько библиотек в единый чанк вот в таком формате
     * /[\\/]node_modules[\\/](react|react-dom|lodash)[\\/]/
     */
    cacheGroups: {
      react: {
        test: /[\\/]node_modules[\\/]((react).*)[\\/]/,
        name: 'react',
        chunks: 'all',
        filename: 'libs/react.min.js',
      },
      lodash: {
        test: /[\\/]node_modules[\\/](lodash)[\\/]/,
        name: 'lodash',
        chunks: 'all',
        filename: 'libs/lodash.min.js',
      }, 
      ramda: {
        test: /[\\/]node_modules[\\/](ramda)[\\/]/,
        name: 'ramda',
        chunks: 'all',
        filename: 'libs/ramda.min.js',
      },
      mui: {
        test: /[\\/]node_modules[\\/]((@material-ui).*)[\\/]/,
        name: 'mui',
        chunks: 'all',
        filename: 'libs/mui.min.js',
      },
    },
  };


module.exports = {
  entry: entry,
  output: {
    path: isDev ? path.resolve(__dirname, './public/dist/dev/') : path.resolve(__dirname, './public/dist/build/'),
    filename: isDev ? '[name]/dev.[name].min.js' : '[name]/build.[name].min.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      Images: path.resolve(__dirname, 'src/images/'),
      Scripts: path.resolve(__dirname, 'src/scripts/'),
      App: path.resolve(__dirname, 'src/scripts/main/react/'),
      Api: path.resolve(__dirname, 'src/scripts/main/api/'),
      Types: path.resolve(__dirname, 'src/scripts/main/types/'),
      Redux: path.resolve(__dirname, 'src/scripts/main/redux/'),
      Utils: path.resolve(__dirname, 'src/scripts/main/utils/'),
      Styles: path.resolve(__dirname, 'src/styles/'),
      Tests: path.resolve(__dirname, 'src/tests/'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].min.css',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'postcss-loader', 'sass-loader'],
      },
      // images
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              generator: content => svgToMiniDataURI(content.toString()),
            },
          },
        ],
      },
    ],
  },
  devtool: isDev ? 'source-map' : false,
  optimization: {
    minimize: isDev ? false : true,
    removeAvailableModules: false,
    mergeDuplicateChunks: true,
    flagIncludedChunks: true,
    removeEmptyChunks: true,
    splitChunks,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};

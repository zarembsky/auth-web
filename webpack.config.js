const glob = require("glob");
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

// constants
const DIST_DIR = path.join(__dirname, 'dist');
const SRC_DIR = path.join(__dirname, 'client', 'src');
const PUB_DIR = path.join(__dirname, 'client', 'public');
const RM = (process.platform === 'win32') ? 'powershell remove-item' : 'rm -f';

module.exports = (env, argv) => ({
	target: 'web',
	devtool: 'none', // source-maps
	performance: {
		hints: false // notify of assets over 250kb
	},
	resolve: {
		symlinks: false, // allow module resolution with `npm link`
		extensions: ['.js', '.jsx'] // allow leaving off file extension when importing
	},
	watchOptions: {
		ignored: /node_modules/
	},
	entry: {
		'js/scripts': [path.join(SRC_DIR, 'index.jsx')],
		'css/styles': glob.sync(SRC_DIR + '/**/*.scss'),
	},
	output: {
		filename: '[name].js',
		path: path.join(DIST_DIR),
	},
	plugins: [
		// copy public dir into dist
		new CopyPlugin({
			patterns: [
				{ from: PUB_DIR, to: DIST_DIR },
			],
		}),
		// Clear './dist' folder
		new CleanWebpackPlugin({
			cleanStaleWebpackAssets: false,
		}),
		// Extract CSS into individual files
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		// Clear duplicate js files created from CSS extraction
		new WebpackShellPlugin({
			onBuildExit: [
				`${RM} ./dist/css/styles.js`,
			]
		}),
		new webpack.DefinePlugin({
			DEVELOPMENT: JSON.stringify(argv.mode === 'development')
		}),
		new NodemonPlugin({
			script: 'index.js',
			watch: path.resolve('./dist'),
			ignore: [
				'*.js.map',
			],
			ext: 'js,json',
			delay: '1000',
		}),
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [SRC_DIR],
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-react'],
							plugins: [
								'@babel/plugin-proposal-class-properties',
								'@babel/plugin-proposal-object-rest-spread',
							]
						}
					},
					'eslint-loader'
				]
			}, {
				test: /\.(sa|sc|c)ss$/,
				resolve: {
					extensions: ['.css', '.scss', '.sass']
				},
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				]
			}, {
				test: /\.svg$/,
				loader: 'svg-url-loader'
			}, {
				test: /\.(png|woff|woff2|eot|ttf)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 100000
					}
				}
			}
		]
	}
});

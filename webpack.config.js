const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const theme = require('./theme');
const webpack = require('webpack');
const APP_DIR = path.resolve(__dirname, 'src/');

module.exports = {
	entry: ['./src/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js'
	},
	module: {
		rules: [
			{
				test: /\.js?/,
				include: APP_DIR,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(sass|less|css)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'less-loader',
						options: {
							modifyVars: theme,
							javascriptEnabled: true
						}
					}
				]
			},
			{
				test: /\.(png|jpg)$/,
				include: path.join(__dirname, 'dist/assets'),
				loader: 'file-loader'
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(jpe?g|png|gif|svg|png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000'
			},
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader']
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, 'public', 'index.html'),
			favicon: path.join(__dirname, 'public', 'favicon.ico')
		}),
		new Dotenv(),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(dotenv.parsed)
		})
	],
	devServer: {
		port: dotenv.parsed.APP_PORT || 8003,
		host: dotenv.parsed.APP_HOST || 'localhost',
		inline: true,
		hot: false,
		disableHostCheck: true
	}
};

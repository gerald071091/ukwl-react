/**
 * Created by bernard.molina on 4/19/2017.
 */
var path = require('path'),
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		vendor: [
			'jquery',
			'./Media/Content/vendor/bootstrap/js/bootstrap.min.js'
		],
		app: './Media/src/main.js'
	},

	devtool: 'source-map',
	output: {
		path: path.join(__dirname, 'Media/Content/'),
		filename: 'js/app.js'
	},
	module: {

		rules: [
			{
				test: /\.(js|jsx|es6)$/,
				enforce: "pre",
				exclude: /(node_modules|vendor)/,
				loader: "eslint-loader"
			},

			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},

			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader"]
				})
			},

			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]", "sass-loader"]
				})
			},

			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					'url-loader?limit=10000',
					'img-loader'
				]
			},

			{
				test: /\.(ttf|eot|otf|woff|woff2)$/,
				loader: 'url-loader'
			}
		]
	},

	externals: {
		$: 'jquery',
		'window.jquery': 'jquery',
		'window.$': 'jquery',
		'window.jQuery': 'jquery',
		jQuery: 'jquery'
	},

	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'base-component': path.resolve(__dirname, 'Media/src/base-component'),

			comp: path.resolve(__dirname, 'Media/src/components'),
			config: path.resolve(__dirname, 'Media/src/config'),
			content: path.resolve(__dirname, 'Media/content'),
			enums: path.resolve(__dirname, 'Media/src/js/enums'),
			lib: path.resolve(__dirname, 'Media/src/lib'),
			nls: path.resolve(__dirname, 'Media/src/helpers/nls'),
			res: path.resolve(__dirname, 'Media/src/helpers/res'),
			helpers: path.resolve(__dirname, 'Media/src/helpers'),
			partials: path.resolve(__dirname, 'Media/src/partials'),
			validation: path.resolve(__dirname, 'Media/src/js/validation'),
			views: path.resolve(__dirname, 'Media/src/views')
		}
	},

	stats: { children: false },

	plugins: [
		new ExtractTextPlugin({
			filename: 'css/master.css',
			disable: false, allChunks: true
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			filename: "js/vendor.js"
		}),

		new webpack.ProvidePlugin({
			$: 'jquery',
			'window.jquery': 'jquery',
			'window.$': 'jquery',
			'window.jQuery': 'jquery',
			jQuery: 'jquery'
		}),
	]
}
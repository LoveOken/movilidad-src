const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		visualizacionDatosEMAC: './src/main.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}
		]
	}
};

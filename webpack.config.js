const path = require('path');
const glob = require('glob');

const entry = glob.sync('./src/*.js').reduce((entries, path) => {
	const split = path.split('/');
	const name = split[2];

	entries[name] = path;

	return entries;
}, {});

module.exports = {
	mode: 'production',
	entry,
	output: {
		filename: '[name]',
		path: path.resolve(__dirname, 'dist')
	}
};

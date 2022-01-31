const createDataset = require('./createDataset');

module.exports = (labels, colors) => {
	return {
		labels,
		datasets: colors.map((c) => createDataset(c))
	};
};

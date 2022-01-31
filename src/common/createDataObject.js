const createDataset = require('./createDataset');

module.exports = (labels, colors, fill = false, width = 2) => {
	return {
		labels,
		datasets: colors.map((c) => createDataset(c, fill, width))
	};
};

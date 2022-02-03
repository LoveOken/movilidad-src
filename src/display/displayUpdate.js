module.exports = function (rows) {
	let i = 0;

	for (const dataset of this.data.datasets) {
		dataset.label = rows[i].label;
		dataset.data = rows[i].cells.map(Number);
		i++;
	}

	this.update();
};

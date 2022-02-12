module.exports = function (zero) {
	// this.options.scales.y.beginAtZero = zero;

	if (zero) {
		this.options.scales.y.max = undefined;
	} else {
		this.options.scales.y.max = 1;
	}
};

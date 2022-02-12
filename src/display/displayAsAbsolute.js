module.exports = function (axis) {
	const thousands = function (value) {
		return Math.abs(value)
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	};

	this.options.scales[axis].ticks.callback = thousands;

	this.options.plugins.tooltip.callbacks.label = function (context) {
		let label = context.dataset.label || '';

		if (label) {
			label += ': ';
		}

		if (context.parsed[axis] !== null) {
			label += thousands(context.parsed[axis]);
		}

		return label;
	};
};

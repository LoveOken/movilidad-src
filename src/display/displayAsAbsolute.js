module.exports = function (axis) {
	this.options.scales[axis].ticks.callback = function (value) {
		return Math.abs(value);
	};
	this.options.plugins.tooltip.callbacks.label = function (context) {
		let label = context.dataset.label || '';

		if (label) {
			label += ': ';
		}

		if (context.parsed[axis] !== null) {
			label += Math.abs(context.parsed[axis]);
		}

		return label;
	};
};

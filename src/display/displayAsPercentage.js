module.exports = function (axis, multiplier = 1, fixed = 0) {
	this.options.scales[axis].ticks.callback = function (value) {
		return parseFloat(value * multiplier).toFixed(fixed) + '%';
	};
	this.options.plugins.tooltip.callbacks.label = function (context) {
		let label = context.dataset.label || '';

		if (label) {
			label += ': ';
		}

		if (context.parsed[axis] !== null) {
			label += parseFloat(context.parsed[axis] * multiplier).toFixed(1) + '%';
		}

		return label;
	};
};

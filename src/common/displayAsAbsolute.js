module.exports = (axis, chart) => {
	chart.options.scales[axis].ticks.callback = function (value) {
		return Math.abs(value);
	};
	chart.options.plugins.tooltip.callbacks.label = function (context) {
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

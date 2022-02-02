module.exports = (axis, chart, multiplier = 1) => {
	chart.options.scales[axis].ticks.callback = function (value) {
		return value * multiplier + '%';
	};
	chart.options.plugins.tooltip.callbacks.label = function (context) {
		let label = context.dataset.label || '';

		if (label) {
			label += ': ';
		}

		if (context.parsed[axis] !== null) {
			label += parseFloat(context.parsed[axis] * multiplier).toFixed(2) + '%';
		}

		return label;
	};
};

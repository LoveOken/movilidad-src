module.exports = (axis, chart) => {
	chart.options.scales[axis].ticks.callback = undefined;
	chart.options.plugins.tooltip.callbacks.label = undefined;
};

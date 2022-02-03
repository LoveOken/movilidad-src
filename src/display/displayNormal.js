module.exports = function (axis) {
	this.options.scales[axis].ticks.callback = undefined;
	this.options.plugins.tooltip.callbacks.label = undefined;
};

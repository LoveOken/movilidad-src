/* global Chart */
module.exports = (config, canvas) => {
	let factor = Math.min(canvas.offsetWidth / 600, 1);

	Chart.defaults.font.size = 12 * factor;

	config.options.plugins.title.font.size = 21 * factor;
	config.options.plugins.legend.title.font.size = 14 * factor;
	config.options.plugins.subtitle.font.size = 12 * factor;

	console.log(config.options.aspectRatio, canvas.offsetWidth);
};

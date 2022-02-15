/* global Chart */
module.exports = (config, canvas) => {
	const factor = Math.min(canvas.offsetWidth / 500, 1);

	Chart.defaults.font.size = 12 * factor;

	config.options.plugins.title.font.size = 25 * factor;
	config.options.plugins.legend.title.font.size = 14 * factor;
	config.options.plugins.subtitle.font.size = 12 * factor;

	config.options.aspectRatio = 1.2 * factor;

	console.log(canvas.offsetWidth);
};

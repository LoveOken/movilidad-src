/* global Chart */

/**
 * Cambia el tamaño de las tipografías de manera dinámica
 * @param {*} config Configuracion de ChartJS
 * @param {HTMLCanvasElement} canvas Elemento Canvas
 */

module.exports = (config, canvas) => {
	let factor = Math.min(canvas.offsetWidth / 600, 1);

	Chart.defaults.font.size = 12 * factor;

	config.options.plugins.title.font.size = 21 * factor;
	config.options.plugins.legend.title.font.size = 14 * factor;
	config.options.plugins.subtitle.font.size = 12 * factor;
};

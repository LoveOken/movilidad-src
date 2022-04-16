/**
 * Oculta las etiquetas en un gráfico
 * @param {*} config Configuración de ChartJS
 */

module.exports = (config) => {
	config.options.plugins.legend.labels = {
		boxWidth: 0,
		boxHeight: 0,
		font: {
			size: 0
		}
	};
};

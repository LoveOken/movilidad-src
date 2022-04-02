/* global Chart */
const colors = require('../common/colors');
const customBackground = require('./customBackground');

/**
 * Crea un objeto de configuración de ChartJS
 * @param {String} type Tipo de gráfico
 * @param {*} data Objeto de datos
 * @param {*} options Opciones adicionales
 * @returns {*} Objeto de configuration
 */

module.exports = (type, data, options = {}) => {
	Chart.defaults.font.family = "'Open Sans', sans-serif";
	Chart.defaults.font.weight = 300;
	Chart.defaults.font.color = colors.gray;

	return {
		type,
		data,
		options: {
			maintainAspectRatio: true,
			aspectRatio: 1.2,
			elements: {
				point: {
					radius: 0,
					hitRadius: 5
				}
			},
			layout: {
				padding: 15
			},
			plugins: {
				title: {
					display: true,
					text: '',
					position: 'top',
					align: 'start',
					color: colors.cyan,
					padding: 12,
					font: {
						family: "'Josefin Sans', sans-serif"
					}
				},
				subtitle: {
					display: true,
					text: '',
					position: 'bottom',
					align: 'start',
					padding: 12,
					font: {
						weight: 400
					}
				},
				legend: {
					labels: {
						font: {
							weight: 400
						}
					},
					title: {
						display: true,
						text: '',
						font: {
							weight: 400
						}
					}
				},
				tooltip: {
					backgroundColor: colors.gray
				}
			},
			...options
		},
		plugins: [customBackground]
	};
};

/* global Chart */
const colors = require('./colors');
const customBackground = require('./customBackground');

module.exports = (type, data, options = {}) => {
	Chart.defaults.font.family = "'Open Sans', sans-serif";
	Chart.defaults.font.size = 12;
	Chart.defaults.font.weight = 300;
	Chart.defaults.font.color = colors.gray;

	return {
		type,
		data,
		options: {
			aspectRatio: 1.5,
			elements: {
				point: {
					radius: 0,
					hitRadius: 5
				}
			},
			layout: {
				padding: 10
			},
			plugins: {
				title: {
					display: true,
					text: 'Custom chart title.',
					color: colors.cyan,
					position: 'top',
					align: 'start',
					padding: 2,
					font: {
						size: 18,
						family: "'Josefin Sans', sans-serif"
					}
				},
				subtitle: {
					display: true,
					text: 'Cargando...',
					position: 'top',
					align: 'start'
				},
				legend: {
					labels: {
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

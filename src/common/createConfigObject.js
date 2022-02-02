/* global Chart */
const colors = require('./colors');
const customBackground = require('./customBackground');

module.exports = (type, data, options = {}) => {
	Chart.defaults.font.family = "'Open Sans', sans-serif";
	Chart.defaults.font.size = 11;
	Chart.defaults.font.weight = 300;
	Chart.defaults.font.color = colors.gray;

	return {
		type,
		data,
		options: {
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
					text: 'Cargando...',
					color: colors.cyan,
					position: 'top',
					align: 'start',
					padding: 10,
					font: {
						size: 15,
						family: "'Josefin Sans', sans-serif"
					}
				},
				subtitle: {
					display: true,
					padding: 10,
					text: 'Cargando...',
					position: 'bottom',
					align: 'start',
					font: {
						size: 9,
						color: '#000'
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
						text: 'Cargando...',
						align: 'start',
						font: {
							size: 13,
							color: '#000'
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

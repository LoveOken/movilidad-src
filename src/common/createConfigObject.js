/* global Chart */

const colors = require('./colors');
const customBackground = require('./customBackground');

module.exports = (type, data) => {
	Chart.defaults.font.family = "'Open Sans', sans-serif";
	Chart.defaults.font.size = 12;
	Chart.defaults.font.weight = 300;
	Chart.defaults.font.color = colors.gray;

	return {
		type,
		data,
		options: {
			locale: 'es',
			scales: {
				y: { beginAtZero: true }
			},
			layout: {
				padding: 10
			},
			plugins: {
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
			}
		},
		plugins: [customBackground]
	};
};

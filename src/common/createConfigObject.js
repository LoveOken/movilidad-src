/* global Chart */
const colors = require('./colors');
const customBackground = require('./customBackground');
const { Filler } = require('chart.js');

module.exports = (type, data, options = {}) => {
	Chart.defaults.font.family = "'Open Sans', sans-serif";
	Chart.defaults.font.size = 12;
	Chart.defaults.font.weight = 300;
	Chart.defaults.font.color = colors.gray;

	console.log(Filler, data);

	return {
		type,
		data,
		options: {
			...options,
			elements: {
				line: {
					fill: '-1'
				}
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

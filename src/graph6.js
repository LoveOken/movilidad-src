const colors = require('./common/colors');
const englishTitles = require('./common/englishTitles');
const spanishTitles = require('./common/spanishTitles');
const createChart = require('./factories/createChart');

const lang = document.documentElement.lang === 'es' ? spanishTitles : englishTitles;

createChart(
	{
		name: 'graf6',
		colors: [colors.orange],
		type: 'line',
		options: {
			scales: {
				y: {
					min: 0,
					max: 10
				}
			}
		},
		ticks: 7,
		labels: false
	},
	{
		getRows: (file) => {
			return {
				etiquetas: file.readRow(8, '3', 'Hoja1').cells,
				hoja1: {
					porcentaje: file.readRow(12, '4', 'Hoja1')
				}
			};
		},
		getFilename: () => lang.title6,
		onFetch: (rows, select, display) => {
			display.title(lang.title6, lang.subtitle6, lang.source2);
			display.percentage('y');
			display.update(Object.values(rows.hoja1));
		}
	}
);

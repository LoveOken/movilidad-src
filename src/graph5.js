const colors = require('./common/colors');
const englishTitles = require('./common/englishTitles');
const spanishTitles = require('./common/spanishTitles');
const createChart = require('./factories/createChart');

const lang = document.documentElement.lang === 'es' ? spanishTitles : englishTitles;

createChart(
	{
		name: 'graf5',
		colors: [colors.orange, colors.cyan],
		type: 'bar',
		options: {
			indexAxis: 'y',
			scales: {
				x: {
					stacked: true
				},
				y: {
					stacked: true,
					reverse: true
				}
			}
		},
		ticks: 17
	},
	{
		getRows: (file) => {
			return {
				etiquetas: file.readColumn(4, 21, 'A', 'Hoja1').cells,
				hoja1: {
					mujeres: file.readColumn(4, 21, 'O', 'Hoja1').invert(),
					hombres: file.readColumn(4, 21, 'N', 'Hoja1')
				}
			};
		},
		getFilename: () => lang.title5.join(' '),
		onFetch: (rows, select, display) => {
			display.title(lang.title5, lang.subtitle4n5, lang.source2);
			display.absolute('x');
			display.update(Object.values(rows.hoja1));
		}
	}
);

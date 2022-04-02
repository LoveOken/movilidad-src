const colors = require('./common/colors');
const englishTitles = require('./common/englishTitles');
const spanishTitles = require('./common/spanishTitles');
const createChart = require('./factories/createChart');

const lang = document.documentElement.lang === 'es' ? spanishTitles : englishTitles;

createChart(
	{
		name: 'graf1',
		colors: [colors.navy, colors.blue, colors.cyan, colors.orange],
		type: 'line',
		options: {
			scales: {
				y: {
					min: 0
				}
			}
		},
		ticks: 11
	},
	{
		getData: (file) => {
			return {
				etiquetas: file.readRow(12, '3', 'Hoja1').cells,
				hoja1: {
					preescolar: file.readRow(12, '4', 'Hoja1'),
					primaria: file.readRow(12, '5', 'Hoja1'),
					secundaria: file.readRow(12, '6', 'Hoja1'),
					terciaria: file.readRow(12, '7', 'Hoja1').nullify()
				}
			};
		},
		getFilename: () => lang.title1,
		setFills: (data) => {
			data.datasets[0].fill = '3';
			data.datasets[1].fill = '2';
			data.datasets[2].fill = '0';
			data.datasets[3].fill = 'origin';
		},
		onFetch: (rows, select, display) => {
			// Funciones para actualizar el gráfico
			display.title(lang.title1, lang.subtitle1, lang.source1);

			display.percentage('y');
			display.update(Object.values(rows.hoja1));
		}
	}
);

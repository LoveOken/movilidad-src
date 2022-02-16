const colors = require('./common/colors');
const englishTitles = require('./common/englishTitles');
const spanishTitles = require('./common/spanishTitles');
const createChart = require('./factories/createChart');

const lang = document.documentElement.lang === 'es' ? spanishTitles : englishTitles;

createChart(
	{
		name: 'graf4',
		colors: [colors.orange],
		type: 'bar',
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		},
		ticks: 18,
		labels: false
	},
	{
		getRows: (file) => {
			return {
				etiquetas: file.readColumn(3, 21, 'A', 'Hoja1').shift().cells,
				hoja1: {
					poblacionTotalMigrante: file.readColumn(3, 21, 'H', 'Hoja1').shift()
				}
			};
		},
		getFilename: () => lang.title4.join(' '),
		onFetch: (rows, select, display) => {
			display.title(lang.title4, lang.subtitle4n5, lang.source2);
			display.update(Object.values(rows.hoja1));
		}
	}
);

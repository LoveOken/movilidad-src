const colors = require('./common/colors');
const createChart = require('./factories/createChart');

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
		getFilename: () => 'poblacion_total_migrante_2020.png',
		onFetch: (rows, select, display) => {
			display.title(
				['Ecuador - Distribución de población migrante', 'por grupo etario'],
				'Total a mediados de 2020.',
				[
					'United Nations Department of Economic and Social Affairs, Population Division (2020).',
					'International Migrant Stock 2020 https://www.un.org/development/desa/pd/content/international-migrant-stock.',
					'Fecha de descarga: 6 Diciembre, 2021'
				]
			);
			display.update(Object.values(rows.hoja1));
		}
	}
);

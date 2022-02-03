const colors = require('./common/colors');
const createChart = require('./factories/createChart');

createChart(
	{
		url: document.getElementsByName('sheet-url')[0].content,
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
		getFilename: () => 'poblacion_migrante_como_porcentaje_del_total.png',
		onFetch: (rows, select, display) => {
			display.title(
				'Ecuador - Población migrante',
				'Porcentaje de la población total por año.',
				[
					'United Nations Department of Economic and Social Affairs, Population Division (2020).',
					'International Migrant Stock 2020 https://www.un.org/development/desa/pd/content/international-migrant-stock.',
					'Fecha de descarga: 6 Diciembre, 2021'
				]
			);
			display.percentage('y');
			display.update(Object.values(rows.hoja1));
		}
	}
);

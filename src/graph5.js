const colors = require('./common/colors');
const createChart = require('./factories/createChart');

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
		getFilename: () => 'poblacion_migrante_por_edad_y_sexo_2020.png',
		onFetch: (rows, select, display) => {
			display.title(
				'Ecuador - Distribución de población migrante por grupo etario y sexo',
				'Total a mediados de 2020.',
				[
					'United Nations Department of Economic and Social Affairs, Population Division (2020).',
					'International Migrant Stock 2020 https://www.un.org/development/desa/pd/content/international-migrant-stock.',
					'Fecha de descarga: 6 Diciembre, 2021'
				]
			);
			display.absolute('x');
			display.update(Object.values(rows.hoja1));
		}
	}
);

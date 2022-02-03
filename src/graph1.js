const colors = require('./common/colors');
const createChart = require('./factories/createChart');

createChart(
	{
		url: document.getElementsByName('sheet-url')[0].content,
		name: 'graf1',
		colors: [colors.gray, colors.cyan, colors.navy, colors.orange],
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
		getRows: (file) => {
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
		getFilename: () => 'matriculacion_por_nivel_educacional.png',
		setFills: (data) => {
			data.datasets[0].fill = '3';
			data.datasets[1].fill = '2';
			data.datasets[2].fill = '0';
			data.datasets[3].fill = 'origin';
		},
		onFetch: (rows, select, display) => {
			// Funciones para actualizar el gráfico
			display.title('Ecuador - Matriculación Escolar', 'Porcentaje bruto por año.', [
				'Fuente: World Development Indicators v.4, The World Bank.',
				'https://datacatalog.worldbank.org/search/dataset/0037712/World-Development-Indicators.',
				'Fecha de descarga: 6 Diciembre, 2021'
			]);

			display.percentage('y');
			display.update(Object.values(rows.hoja1));
		}
	}
);

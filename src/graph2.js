const colors = require('./common/colors');
const createChart = require('./factories/createChart');

createChart(
	{
		url: document.getElementsByName('sheet-url')[0].content,
		name: 'graf2',
		colors: [colors.orange],
		type: 'line',
		options: {
			scales: {
				y: {
					min: 90,
					max: 100
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
					edades15oMas: file.readRow(12, '4', 'Hoja1').nullify()
				},
				hoja2: {
					edades15a24: file.readRow(12, '4', 'Hoja2').nullify()
				}
			};
		},
		getFilename: (select) => {
			if (select.value == 1) {
				return 'alfabetizacion_15_años_o_mas.png';
			} else {
				return 'alfabetizacion_15_a_24_años.png';
			}
		},
		onFetch: (rows, select, display) => {
			select.onchange = () => {
				let sheet;

				if (select.value == 1) {
					sheet = rows.hoja1;
				} else {
					sheet = rows.hoja2;
				}

				display.update(Object.values(sheet));
			};

			display.title('Ecuador - Tasa de alfabetización', 'Porcentaje de personas por año.', [
				'Fuente: World Development Indicators v.4, The World Bank.',
				'https://datacatalog.worldbank.org/search/dataset/0037712/World-Development-Indicators.',
				'Fecha de descarga: 6 Diciembre, 2021'
			]);
			display.percentage('y');
			select.onchange();
		}
	}
);

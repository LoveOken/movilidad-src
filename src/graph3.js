const colors = require('./common/colors');
const createChart = require('./factories/createChart');

createChart(
	{
		name: 'graf3',
		colors: [colors.orange],
		type: 'line',
		options: {
			scales: {
				y: {
					min: 0,
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
					logroPrimaria: file.readRow(12, '4', 'Hoja1').nullify()
				},
				hoja2: {
					logroSecundaria: file.readRow(12, '4', 'Hoja2').nullify()
				},
				hoja3: {
					logroSecundariaAlta: file.readRow(12, '4', 'Hoja3').nullify()
				}
			};
		},
		getFilename: (select) => {
			if (select.value == 1) {
				return 'logro_educativo_primaria.png';
			} else if (select.value == 2) {
				return 'logro_educativo_secundaria_baja.png';
			} else {
				return 'logro_educativo_secundaria_alta.png';
			}
		},
		onFetch: (rows, select, display) => {
			select.onchange = () => {
				let sheet, subtitle;

				if (select.value == 1) {
					sheet = rows.hoja1;
					subtitle = ' (Al menos primaria completa)';
				} else if (select.value == 2) {
					sheet = rows.hoja2;
					subtitle = ' (Al menos secundaria baja completa)';
				} else {
					sheet = rows.hoja3;
					subtitle = ' (Al menos secundaria alta completa)';
				}

				display.title(
					['Ecuador - Logro educativo en población', 'de 25 años o más'],
					'Porcentaje total acumulado por año.' + subtitle,
					[
						'Fuente: World Development Indicators v.4, The World Bank.',
						'https://datacatalog.worldbank.org/search/dataset/0037712/World-Development-Indicators.',
						'Fecha de descarga: 6 Diciembre, 2021'
					]
				);

				display.update(Object.values(sheet));
			};

			display.percentage('y');
			select.onchange();
		}
	}
);

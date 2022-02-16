const colors = require('./common/colors');
const englishTitles = require('./common/englishTitles');
const spanishTitles = require('./common/spanishTitles');
const createChart = require('./factories/createChart');

const lang = document.documentElement.lang === 'es' ? spanishTitles : englishTitles;

createChart(
	{
		name: 'graf2',
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
					edades15oMas: file.readRow(12, '4', 'Hoja1').nullify()
				},
				hoja2: {
					edades15a24: file.readRow(12, '4', 'Hoja2').nullify()
				}
			};
		},
		getFilename: (select) => {
			if (select.value == 1) {
				return lang.title2 + lang.subtitle2a;
			} else {
				return lang.title2 + lang.subtitle2b;
			}
		},
		onFetch: (rows, select, display) => {
			select.onchange = () => {
				let sheet, subtitle;

				if (select.value == 1) {
					sheet = rows.hoja1;
					subtitle = lang.subtitle2a;
				} else {
					sheet = rows.hoja2;
					subtitle = lang.subtitle2b;
				}

				display.title(lang.title2, lang.subtitle2 + subtitle, lang.source1);

				display.update(Object.values(sheet));
			};

			display.percentage('y');
			select.onchange();
		}
	}
);

const colors = require('./common/colors');
const englishTitles = require('./common/englishTitles');
const spanishTitles = require('./common/spanishTitles');
const createChart = require('./factories/createChart');

const lang = document.documentElement.lang === 'es' ? spanishTitles : englishTitles;

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
		getData: (file) => {
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
				return lang.title3.join(' ') + lang.subtitle3a;
			} else if (select.value == 2) {
				return lang.title3.join(' ') + lang.subtitle3b;
			} else {
				return lang.title3.join(' ') + lang.subtitle3c;
			}
		},
		onFetch: (rows, select, display) => {
			select.onchange = () => {
				let sheet, subtitle;

				if (select.value == 1) {
					sheet = rows.hoja1;
					subtitle = lang.subtitle3a;
				} else if (select.value == 2) {
					sheet = rows.hoja2;
					subtitle = lang.subtitle3b;
				} else {
					sheet = rows.hoja3;
					subtitle = lang.subtitle3c;
				}

				display.title(lang.title3, lang.subtitle3 + subtitle, lang.source1);

				display.update(Object.values(sheet));
			};

			display.percentage('y');
			select.onchange();
		}
	}
);

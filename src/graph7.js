const colors = require('./common/colors');
const englishTitles = require('./common/englishTitles');
const spanishTitles = require('./common/spanishTitles');
const createChart = require('./factories/createChart');

const lang = document.documentElement.lang === 'es' ? spanishTitles : englishTitles;

createChart(
	{
		name: 'graf7',
		colors: [
			colors.orange,
			colors.orange2,
			colors.orange3,
			colors.orange4,
			colors.cyan,
			colors.navy
		],
		type: 'line',
		options: {
			y: {
				stacked: true,
				min: 0
			}
		},
		ticks: 12
	},
	{
		getData: (file) => {
			return {
				etiquetas: file.readRow(13, '3', 'Hoja1').cells,
				hoja1: {
					ecuador: file.readRow(13, '4', 'Hoja1'),
					colombia: file.readRow(13, '5', 'Hoja1'),
					peru: file.readRow(13, '8', 'Hoja1'),
					venezuela: file.readRow(13, '9', 'Hoja1'),
					otrosPaises: file.readRow(13, '6', 'Hoja1'),
					otrosContinentes: file.readRow(13, '7', 'Hoja1')
				},
				hoja2: {
					ecuador: file.readRow(13, '4', 'Hoja2'),
					colombia: file.readRow(13, '5', 'Hoja2'),
					peru: file.readRow(13, '8', 'Hoja2'),
					venezuela: file.readRow(13, '9', 'Hoja2'),
					otrosPaises: file.readRow(13, '6', 'Hoja2'),
					otrosContinentes: file.readRow(13, '7', 'Hoja2')
				}
			};
		},
		getFilename: (select) => {
			if (select.value == 1) {
				return lang.title7.join(' ') + ' (' + lang.subtitle7a + ')';
			} else {
				return lang.title7.join(' ') + ' (' + lang.subtitle7b + ')';
			}
		},
		setFills: (data) => {
			let i = 0;
			for (const dataset of data.datasets) {
				if (i > 0) {
					dataset.fill = '-1';
				} else {
					dataset.fill = 'origin';
				}

				i++;
			}
		},
		onFetch: (rows, select, display) => {
			select.onchange = () => {
				let sheet, subtitle;

				if (select.value == 1) {
					sheet = rows.hoja1;
					subtitle = lang.subtitle7a;
					display.normal('y');
					display.zero(true);
				} else {
					sheet = rows.hoja2;
					subtitle = lang.subtitle7b;
					display.zero(false);
				}

				display.title(lang.title7, subtitle, '');
				display.update(Object.values(sheet));
			};

			select.onchange();
		}
	}
);

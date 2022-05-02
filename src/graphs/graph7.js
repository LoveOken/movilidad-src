module.exports = (colors, lang, createChart) => {
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
				file.setLang(lang);
				const etiquetas = [
					'2009-2010',
					'2010-2011',
					'2011-2012',
					'2012-2013',
					'2013-2014',
					'2014-2015',
					'2015-2016',
					'2016-2017',
					'2017-2018',
					'2018-2019',
					'2019-2020',
					'2020-2021'
				];

				return {
					etiquetas,
					hoja1: file.readMany('ec', 'matricula_cantidad', etiquetas),
					hoja2: file.readMany('ec', 'matricula_porcentaje', etiquetas)
				};
			},
			getFilename: (code, select) => {
				const title = lang.title7.replace('{c}', lang['country' + code]) + ' ';

				if (select.value == 1) {
					return title + lang.subtitle7a;
				} else {
					return title + lang.subtitle7b;
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
			onFetch: (rows, code, select, display) => {
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

					display.title(lang.title7.replace('{c}', lang['country' + code]), subtitle, '');
					display.update(Object.values(sheet));
				};

				select.onchange();
			}
		}
	);
};

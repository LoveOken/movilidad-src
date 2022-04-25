module.exports = (colors, lang, createChart) => {
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
			getData: (file, country) => {
				file.setLang(lang);
				const etiquetas = [
					'2010',
					'2011',
					'2012',
					'2013',
					'2014',
					'2015',
					'2016',
					'2017',
					'2018',
					'2019',
					'2020'
				];

				return {
					etiquetas,
					hoja1: {
						edades15oMas: file.readRow(country, '15_anos_o_mas', etiquetas).nullify()
					},
					hoja2: {
						edades15a24: file.readRow(country, '15_a_24_anos', etiquetas).nullify()
					}
				};
			},
			getFilename: (code, select) => {
				const title = lang.title2.replace('{c}', lang['country' + code]) + ' ';

				if (select.value == 1) {
					return title + lang.subtitle2a;
				} else {
					return title + lang.subtitle2b;
				}
			},
			onFetch: (rows, code, select, display) => {
				select.onchange = () => {
					let sheet, subtitle;

					if (select.value == 1) {
						sheet = rows.hoja1;
						subtitle = lang.subtitle2a;
					} else {
						sheet = rows.hoja2;
						subtitle = lang.subtitle2b;
					}

					display.title(
						lang.title2.replace('{c}', lang['country' + code]),
						subtitle,
						lang.source1
					);

					display.update(Object.values(sheet));
				};

				display.percentage('y');
				select.onchange();
			}
		}
	);
};

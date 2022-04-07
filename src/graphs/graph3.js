module.exports = (colors, lang, createChart) => {
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
			getData: (file, country) => {
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
						logroPrimaria: file.readRow(country, 'primaria', etiquetas).nullify()
					},
					hoja2: {
						logroSecundaria: file.readRow(country, 'sec_baja', etiquetas).nullify()
					},
					hoja3: {
						logroSecundariaAlta: file.readRow(country, 'sec_alta', etiquetas).nullify()
					}
				};
			},
			getFilename: (code, select) => {
				if (select.value == 1) {
					return lang.title3.join(' ').replace('{c}', lang.country[code]) + lang.subtitle3a;
				} else if (select.value == 2) {
					return lang.title3.join(' ').replace('{c}', lang.country[code]) + lang.subtitle3b;
				} else {
					return lang.title3.join(' ').replace('{c}', lang.country[code]) + lang.subtitle3c;
				}
			},
			onFetch: (rows, code, select, display) => {
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

					display.title(
						lang.title3.map((v) => v.replace('{c}', lang.country[code])),
						lang.subtitle3 + subtitle,
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
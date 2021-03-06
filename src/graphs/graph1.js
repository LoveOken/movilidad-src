module.exports = (colors, lang, createChart) => {
	createChart(
		{
			name: 'graf1',
			colors: [colors.navy, colors.blue, colors.cyan, colors.orange],
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
						preescolar: file.readRow(country, ['ed_preescolar', 'ed_preprimary'], etiquetas),
						primaria: file.readRow(country, ['ed_primaria', 'ed_primary'], etiquetas),
						secundaria: file.readRow(country, ['ed_secundaria', 'ed_secondary'], etiquetas),
						terciaria: file.readRow(country, ['ed_terciaria', 'ed_terciary'], etiquetas)
					}
				};
			},
			getFilename: (code) => lang.title1.replace('{c}', lang['country' + code]),
			setFills: (data) => {
				for (const dataset of data.datasets) {
					const hex = dataset.backgroundColor.slice(0, 7);

					dataset.backgroundColor = hex + '15';
				}
			},
			onFetch: (rows, code, select, display) => {
				display.title(
					lang.title1.replace('{c}', lang['country' + code]),
					lang.subtitle1,
					lang.source1
				);

				display.percentage('y');
				display.update(Object.values(rows.hoja1));
			}
		}
	);
};

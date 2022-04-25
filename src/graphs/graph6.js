module.exports = (colors, lang, createChart) => {
	createChart(
		{
			name: 'graf6',
			colors: [colors.orange],
			type: 'line',
			options: {
				scales: {
					y: {
						min: 0,
						max: 10
					}
				}
			},
			ticks: 7,
			labels: false
		},
		{
			getData: (file, country) => {
				file.setLang(lang);
				const etiquetas = ['1990', '1995', '2000', '2005', '2010', '2015', '2020'];

				return {
					etiquetas,
					hoja1: {
						porcentaje: file.readRow(country, 'pobl_migrante_porcentaje', etiquetas)
					}
				};
			},
			getFilename: (code) => lang.title6.replace('{c}', lang['country' + code]),
			onFetch: (rows, code, select, display) => {
				display.title(
					lang.title6.replace('{c}', lang['country' + code]),
					lang.subtitle6,
					lang.source2
				);
				display.percentage('y');
				display.update(Object.values(rows.hoja1));
			}
		}
	);
};

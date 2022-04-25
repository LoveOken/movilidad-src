module.exports = (colors, lang, createChart) => {
	createChart(
		{
			name: 'graf5',
			colors: [colors.orange, colors.cyan],
			type: 'bar',
			options: {
				indexAxis: 'y',
				scales: {
					x: {
						stacked: true
					},
					y: {
						stacked: true,
						reverse: true
					}
				}
			},
			ticks: 17
		},
		{
			getData: (file, country) => {
				file.setLang(lang);
				const etiquetas = [
					'0a4',
					'5a9',
					'10a14',
					'15a19',
					'20a24',
					'25a29',
					'30a34',
					'35a39',
					'40a44',
					'45a49',
					'50a54',
					'55a59',
					'60a64',
					'65a69',
					'70a74',
					'75_mas'
				];

				return {
					etiquetas,
					hoja1: {
						mujeres: file.readRow(country, 'pobl_migrante_muj', etiquetas).invert(),
						hombres: file.readRow(country, 'pobl_migrante_hom', etiquetas)
					}
				};
			},
			getFilename: (code) => lang.title5.replace('{c}', lang['country' + code]),
			onFetch: (rows, code, select, display) => {
				display.title(
					lang.title5.replace('{c}', lang['country' + code]),
					lang.subtitle5,
					lang.source2
				);
				display.absolute('x');
				display.update(Object.values(rows.hoja1));
			}
		}
	);
};

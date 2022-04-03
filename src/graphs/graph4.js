module.exports = (colors, lang, createChart) => {
	createChart(
		{
			name: 'graf4',
			colors: [colors.orange],
			type: 'bar',
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			},
			ticks: 18,
			labels: false
		},
		{
			getData: (file, country) => {
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
						poblacionTotalMigrante: file.readRow(country, 'pobl_migrante_cant', etiquetas)
					}
				};
			},
			getFilename: (code) => lang.title4.join(' ').replace('{c}', lang.country[code]),
			onFetch: (rows, code, select, display) => {
				display.title(
					lang.title4.map((v) => v.replace('{c}', lang.country[code])),
					lang.subtitle4n5,
					lang.source2
				);
				display.update(Object.values(rows.hoja1));
			}
		}
	);
};

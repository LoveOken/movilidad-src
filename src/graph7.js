const colors = require('./common/colors');
const createChart = require('./factories/createChart');

createChart(
	{
		url: document.getElementsByName('sheet-url')[0].content,
		name: 'graf7',
		colors: [colors.orange, colors.cyan, colors.navy],
		type: 'line',
		options: {
			y: {
				stacked: true
			}
		},
		ticks: 12
	},
	{
		getRows: (file) => {
			return {
				etiquetas: file.readRow(13, '3', 'Hoja1').cells,
				hoja1: {
					ecuador: file.readRow(13, '4', 'Hoja1'),
					otrosPaises: file.readRow(13, '6', 'Hoja1'),
					otrosContinentes: file.readRow(13, '7', 'Hoja1')
				},
				hoja2: {
					ecuador: file.readRow(13, '4', 'Hoja2'),
					otrosPaises: file.readRow(13, '6', 'Hoja2'),
					otrosContinentes: file.readRow(13, '7', 'Hoja2')
				}
			};
		},
		getFilename: (select) => {
			if (select.value == 1) {
				return 'total_estudiantes_matriculados.png';
			} else {
				return 'distribucion_estudiantes_matriculados.png';
			}
		},
		setFills: (data) => {
			data.datasets[0].fill = 'origin';
			data.datasets[1].fill = '-1';
			data.datasets[2].fill = '-1';
		},
		onFetch: (rows, select, display) => {
			select.onchange = () => {
				let sheet;

				if (select.value == 1) {
					sheet = rows.hoja1;
					display.normal('y');
					display.zero(true);
				} else {
					sheet = rows.hoja2;
					display.percentage('y', 100);
					display.zero(false);
				}

				display.update(Object.values(sheet));
			};

			display.title(
				'Ecuador - Estudiantes matriculados en el sistema educativo',
				'Distribución por nacionalidad por ciclo.',
				''
			);
			select.onchange();
		}
	}
);

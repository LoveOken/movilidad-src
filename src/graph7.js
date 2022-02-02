/* global Chart */
const Spreadsheet = require('./common/readSheets');

const createDataObject = require('./common/createDataObject');
const saveAsImg = require('./common/saveAsImg');
const saveExcelFile = require('./common/saveExcelFile');
const updateGraph = require('./common/updateGraph');
const colors = require('./common/colors');
const createConfigObject = require('./common/createConfigObject');
const displayAsPercentage = require('./common/displayAsPercentage');
const displayNormal = require('./common/displayNormal');
const setTitles = require('./common/setTitles');

const url = document.getElementsByName('sheet-url')[0].content;

/* set up async GET request */
Spreadsheet.fetch(url, (file) => {
	// Cambiar estas variables cambiara los datos que se muestran
	const rows = {
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

	// Configura el gráfico en particular
	const data = createDataObject(rows.etiquetas, [colors.orange, colors.cyan, colors.navy]);

	const config = createConfigObject('line', data, {
		scales: {
			y: {
				stacked: true
			}
		}
	});

	data.datasets[0].fill = 'origin';
	data.datasets[1].fill = '-1';
	data.datasets[2].fill = '-1';

	// Obtiene elementos de la página
	const canvas = document.getElementById('chart');
	const selector = document.getElementById('selector');
	const imgButton = document.getElementById('img-button');
	const fileButton = document.getElementById('file-button');

	const graph = new Chart(canvas, config);

	// Funciones para actualizar el gráfico
	selector.onchange = () => {
		let sheet;

		if (selector.value == 1) {
			sheet = rows.hoja1;
			displayNormal('y', graph);
			graph.config.options.scales.y.beginAtZero = true;
		} else {
			sheet = rows.hoja2;
			displayAsPercentage('y', graph, 100);
			graph.config.options.scales.y.beginAtZero = false;
		}

		console.log(sheet);

		updateGraph(graph, Object.values(sheet));
	};

	setTitles(
		graph,
		'Ecuador - Estudiantes matriculados en el sistema educativo',
		'Distribución por nacionalidad por ciclo.',
		''
	);
	selector.onchange();

	// Funciones para descargar
	imgButton.onclick = () => {
		let filename;

		if (selector.value == 1) {
			filename = 'total_estudiantes_matriculados.png';
		} else {
			filename = 'distribucion_estudiantes_matriculados.png';
		}

		saveAsImg(filename, canvas);
	};

	fileButton.onclick = () => {
		saveExcelFile(url);
	};
});

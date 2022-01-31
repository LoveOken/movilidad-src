/* global Chart */
const Spreadsheet = require('./common/readSheets');

const createDataObject = require('./common/createDataObject');
const customBackground = require('./common/customBackground');
const saveAsImg = require('./common/saveAsImg');
const saveExcelFile = require('./common/saveExcelFile');
const updateGraph = require('./common/updateGraph');

const url = document.getElementsByName('sheet-url')[0].content;

/* set up async GET request */
Spreadsheet.fetch(url, (file) => {
	const data = createDataObject(file.readRow(13, '1', 'Hoja1').cells, ['252, 141, 89', '153, 142, 195', '20, 217, 184']);
	const config = {
		type: 'line',
		data,
		options: {
			locale: 'es',
			scales: {
				y: { beginAtZero: false }
			},
			layout: {
				padding: 10
			}
		},
		plugins: [customBackground]
	};

	// Obtiene elementos de la página
	const canvas = document.getElementById('chart');
	const selector = document.getElementById('selector');
	const imgButton = document.getElementById('img-button');
	const fileButton = document.getElementById('file-button');

	const graph = new Chart(canvas, config);

	// Funciones para actualizar el gráfico
	selector.onchange = () => {
		let sheetname = selector.value == 1 ? 'Hoja1' : 'Hoja2';
		graph.config.options.scales.y.beginAtZero = selector.value == 1;

		updateGraph(graph, [file.readRow(13, '2', sheetname), file.readRow(13, '4', sheetname), file.readRow(13, '5', sheetname)]);
	};

	selector.onchange();

	// Funciones para descargar
	imgButton.onclick = () => {
		const filename = selector.value == 1 ? 'total_matricula.png' : 'distribucion_matricula.png';

		saveAsImg(filename, canvas);
	};

	fileButton.onclick = () => {
		const filename = 'graph7.xslx';

		saveExcelFile(filename, url);
	};
});

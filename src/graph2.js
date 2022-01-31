/* global Chart */
const Spreadsheet = require('./common/readSheets');

const createDataObject = require('./common/createDataObject');
const saveAsImg = require('./common/saveAsImg');
const saveExcelFile = require('./common/saveExcelFile');
const updateGraph = require('./common/updateGraph');
const colors = require('./common/colors');
const createConfigObject = require('./common/createConfigObject');

const url = document.getElementsByName('sheet-url')[0].content;

/* set up async GET request */
Spreadsheet.fetch(url, (file) => {
	const data = createDataObject(file.readRow(12, '3', 'Hoja1').cells, [colors.orange]);

	const config = createConfigObject('line', data);

	// Obtiene elementos de la página
	const canvas = document.getElementById('chart');
	const selector = document.getElementById('selector');
	const imgButton = document.getElementById('img-button');
	const fileButton = document.getElementById('file-button');

	const graph = new Chart(canvas, config);

	graph.config.options.scales.y.min = 90;
	graph.config.options.scales.y.max = 100;

	// Funciones para actualizar el gráfico
	selector.onchange = () => {
		let sheetname;

		if (selector.value == 1) {
			sheetname = 'Hoja1';
		} else {
			sheetname = 'Hoja2';
		}

		updateGraph(graph, [file.readRow(12, '4', sheetname)]);
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

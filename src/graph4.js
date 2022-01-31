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
	const labels = file.readColumn(3, 20, 'A', 'Hoja1');
	labels.cells.shift();

	const data = createDataObject(labels.cells, [colors.blue], true, 0);

	const config = createConfigObject('bar', data);

	// Obtiene elementos de la página
	const canvas = document.getElementById('chart');
	// const selector = document.getElementById('selector');
	const imgButton = document.getElementById('img-button');
	const fileButton = document.getElementById('file-button');

	const graph = new Chart(canvas, config);

	// Funciones para actualizar el gráfico
	const values = file.readColumn(3, 20, 'H', 'Hoja1');
	values.cells.shift();

	updateGraph(graph, [values]);

	// Funciones para descargar
	imgButton.onclick = () => {
		const filename = 'matriculacion_por_nivel_educacional.png';

		saveAsImg(filename, canvas);
	};

	fileButton.onclick = () => {
		const filename = 'graph1.xslx';

		saveExcelFile(filename, url);
	};
});

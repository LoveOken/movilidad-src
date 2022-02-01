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
	const data = createDataObject(file.readRow(12, '3', 'Hoja1').cells, [
		colors.navy,
		colors.cyan,
		colors.blue,
		colors.orange
	]);

	data.datasets[0].fill = '+3';
	data.datasets[1].fill = '+1';
	data.datasets[2].fill = '-2';
	data.datasets[3].fill = 'origin';

	data.datasets[0].order = 2;
	data.datasets[1].order = 2;
	data.datasets[2].order = 2;
	data.datasets[3].order = 1;

	const config = createConfigObject('line', data, {
		scales: {
			y: {
				min: 0
			}
		}
	});

	// Obtiene elementos de la página
	const canvas = document.getElementById('chart');
	const imgButton = document.getElementById('img-button');
	const fileButton = document.getElementById('file-button');

	const graph = new Chart(canvas, config);

	// Funciones para actualizar el gráfico
	updateGraph(graph, [
		file.readRow(12, '4', 'Hoja1'),
		file.readRow(12, '5', 'Hoja1'),
		file.readRow(12, '6', 'Hoja1'),
		file.readRow(12, '7', 'Hoja1').nullify()
	]);

	// Funciones para descargar
	imgButton.onclick = () => {
		const filename = 'matriculacion_por_nivel_educacional.png';

		saveAsImg(filename, canvas);
	};

	fileButton.onclick = () => {
		saveExcelFile(url);
	};
});

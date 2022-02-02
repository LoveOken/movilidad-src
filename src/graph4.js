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
	const data = createDataObject(file.readColumn(3, 20, 'A', 'Hoja1').shift().cells, [
		colors.orange
	]);

	const config = createConfigObject('bar', data, {
		scales: {
			y: {
				beginAtZero: true
			}
		}
	});

	// Obtiene elementos de la página
	const canvas = document.getElementById('chart');
	const imgButton = document.getElementById('img-button');
	const fileButton = document.getElementById('file-button');

	const graph = new Chart(canvas, config);

	// Funciones para actualizar el gráfico
	updateGraph(graph, [file.readColumn(3, 20, 'H', 'Hoja1').shift()]);

	// Funciones para descargar
	imgButton.onclick = () => {
		const filename = 'poblacion_total_migrante_2020.png';

		saveAsImg(filename, canvas);
	};

	fileButton.onclick = () => {
		saveExcelFile(url);
	};
});

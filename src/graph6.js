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
	const data = createDataObject(file.readRow(8, '3', 'Hoja1').cells, [colors.orange]);

	const config = createConfigObject('line', data, {
		scales: {
			y: {
				min: 0,
				max: 10
			}
		}
	});

	// Obtiene elementos de la página
	const canvas = document.getElementById('chart');
	const imgButton = document.getElementById('img-button');
	const fileButton = document.getElementById('file-button');

	const graph = new Chart(canvas, config);

	graph.config.options.scales.y.max = 10;

	// Funciones para actualizar el gráfico
	updateGraph(graph, [file.readRow(12, '4', 'Hoja1')]);

	// Funciones para descargar
	imgButton.onclick = () => {
		const filename = 'poblacion_migrante_como_porcentaje_del_total.png';

		saveAsImg(filename, canvas);
	};

	fileButton.onclick = () => {
		saveExcelFile(url);
	};
});

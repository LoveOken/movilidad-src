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
	const data = createDataObject(file.readColumn(4, 21, 'A', 'Hoja1').cells, [
		colors.blue,
		colors.orange
	]);

	const config = createConfigObject('bar', data, {
		indexAxis: 'y',
		scales: {
			x: {
				stacked: true,
				ticks: {
					callback: function (value) {
						return Math.abs(value);
					}
				}
			},
			y: {
				stacked: true
			}
		}
	});

	config.options.aspectRatio = 1.4;

	// Obtiene elementos de la página
	const canvas = document.getElementById('chart');
	const imgButton = document.getElementById('img-button');
	const fileButton = document.getElementById('file-button');

	const graph = new Chart(canvas, config);

	// Funciones para actualizar el gráfico
	updateGraph(graph, [
		file.readColumn(4, 21, 'O', 'Hoja1').invert(),
		file.readColumn(4, 21, 'N', 'Hoja1')
	]);

	// Funciones para descargar
	imgButton.onclick = () => {
		const filename = 'poblacion_migrante_por_sexo.png';

		saveAsImg(filename, canvas);
	};

	fileButton.onclick = () => {
		saveExcelFile(url);
	};
});

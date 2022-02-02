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

	const config = createConfigObject('line', data, {
		scales: {
			y: {
				min: 0,
				max: 100,
				ticks: {
					callback: function (value) {
						return value + '%';
					}
				}
			}
		}
	});

	// Obtiene elementos de la página
	const canvas = document.getElementById('chart');
	const selector = document.getElementById('selector');
	const imgButton = document.getElementById('img-button');
	const fileButton = document.getElementById('file-button');

	const graph = new Chart(canvas, config);

	// Funciones para actualizar el gráfico
	selector.onchange = () => {
		let sheetname;

		if (selector.value == 1) {
			sheetname = 'Hoja1';
		} else if (selector.value == 2) {
			sheetname = 'Hoja2';
		} else {
			sheetname = 'Hoja3';
		}

		updateGraph(graph, [file.readRow(12, '4', sheetname).nullify()]);
	};

	selector.onchange();

	// Funciones para descargar
	imgButton.onclick = () => {
		const filename = selector.value == 1 ? 'total_matricula.png' : 'distribucion_matricula.png';

		saveAsImg(filename, canvas);
	};

	fileButton.onclick = () => {
		saveExcelFile(url);
	};
});

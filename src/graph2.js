/* global Chart */
const Spreadsheet = require('./common/readSheets');

const createDataObject = require('./common/createDataObject');
const saveAsImg = require('./common/saveAsImg');
const saveExcelFile = require('./common/saveExcelFile');
const updateGraph = require('./common/updateGraph');
const colors = require('./common/colors');
const createConfigObject = require('./common/createConfigObject');
const displayAsPercentage = require('./common/displayAsPercentage');
const setTitles = require('./common/setTitles');

const url = document.getElementsByName('sheet-url')[0].content;

/* set up async GET request */
Spreadsheet.fetch(url, (file) => {
	// Cambiar estas variables cambiara los datos que se muestran
	const rows = {
		etiquetas: file.readRow(12, '3', 'Hoja1').cells,
		hoja1: {
			edades15oMas: file.readRow(12, '4', 'Hoja1').nullify()
		},
		hoja2: {
			edades15a24: file.readRow(12, '4', 'Hoja2').nullify()
		}
	};

	// Configura el gráfico en particular
	const data = createDataObject(rows.etiquetas, [colors.orange]);

	const config = createConfigObject('line', data, {
		scales: {
			y: {
				min: 90,
				max: 100
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
		let sheet;

		if (selector.value == 1) {
			sheet = rows.hoja1;
		} else {
			sheet = rows.hoja1;
		}

		updateGraph(graph, Object.values(sheet));
	};

	displayAsPercentage('y', graph);
	setTitles(graph, 'Ecuador - Tasa de alfabetización', 'Porcentaje de personas por año.', [
		'Fuente: World Development Indicators v.4, The World Bank.',
		'https://datacatalog.worldbank.org/search/dataset/0037712/World-Development-Indicators.',
		'Fecha de descarga: 6 Diciembre, 2021'
	]);
	selector.onchange();

	// Funciones para descargar
	imgButton.onclick = () => {
		let filename;

		if (selector.value == 1) {
			filename = 'alfabetizacion_15_años_o_mas.png';
		} else {
			filename = 'alfabetizacion_15_a_24_años.png';
		}

		saveAsImg(filename, canvas);
	};

	fileButton.onclick = () => {
		saveExcelFile(url);
	};
});

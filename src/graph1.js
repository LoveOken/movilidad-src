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

Spreadsheet.fetch(url, (file) => {
	// Cambiar estas variables cambiara los datos que se muestran
	const rows = {
		etiquetas: file.readRow(12, '3', 'Hoja1').cells,
		hoja1: {
			preescolar: file.readRow(12, '4', 'Hoja1'),
			primaria: file.readRow(12, '5', 'Hoja1'),
			secundaria: file.readRow(12, '6', 'Hoja1'),
			terciaria: file.readRow(12, '7', 'Hoja1').nullify()
		}
	};

	// Configura el gráfico en particular
	const data = createDataObject(rows.etiquetas, [
		colors.navy,
		colors.cyan,
		colors.blue,
		colors.orange
	]);

	const config = createConfigObject('line', data, {
		scales: {
			y: {
				min: 0
			}
		}
	});

	data.datasets[0].fill = '3';
	data.datasets[1].fill = '2';
	data.datasets[2].fill = '0';
	data.datasets[3].fill = 'origin';

	// Obtiene elementos de la página
	const canvas = document.getElementById('chart');
	const imgButton = document.getElementById('img-button');
	const fileButton = document.getElementById('file-button');

	const graph = new Chart(canvas, config);

	// Funciones para actualizar el gráfico
	displayAsPercentage('y', graph);
	setTitles(graph, 'Ecuador - Matriculación Escolar', 'Porcentaje bruto por año.', [
		'Fuente: World Development Indicators v.4, The World Bank.',
		'https://datacatalog.worldbank.org/search/dataset/0037712/World-Development-Indicators.',
		'Fecha de descarga: 6 Diciembre, 2021'
	]);
	updateGraph(graph, Object.values(rows.hoja1));

	// Funciones para descargar
	imgButton.onclick = () => {
		const filename = 'matriculacion_por_nivel_educacional.png';

		saveAsImg(filename, canvas);
	};

	fileButton.onclick = () => {
		saveExcelFile(url);
	};
});

/* global Chart */
const Spreadsheet = require('./common/readSheets');

const createDataObject = require('./common/createDataObject');
const saveAsImg = require('./common/saveAsImg');
const saveExcelFile = require('./common/saveExcelFile');
const updateGraph = require('./common/updateGraph');
const colors = require('./common/colors');
const createConfigObject = require('./common/createConfigObject');
const setTitles = require('./common/setTitles');

const url = document.getElementsByName('sheet-url')[0].content;

/* set up async GET request */
Spreadsheet.fetch(url, (file) => {
	// Cambiar estas variables cambiara los datos que se muestran
	const rows = {
		etiquetas: file.readColumn(3, 21, 'A', 'Hoja1').shift().cells,
		hoja1: {
			poblacionTotalMigrante: file.readColumn(3, 21, 'H', 'Hoja1').shift()
		}
	};

	// Configura el gráfico en particular
	const data = createDataObject(rows.etiquetas, [colors.orange]);

	const config = createConfigObject('bar', data, {
		scales: {
			y: {
				beginAtZero: true
			}
		}
	});

	config.options.plugins.legend.labels = {
		boxWidth: 0,
		boxHeight: 0,
		font: {
			size: 0
		}
	};

	// Obtiene elementos de la página
	const canvas = document.getElementById('chart');
	const imgButton = document.getElementById('img-button');
	const fileButton = document.getElementById('file-button');

	const graph = new Chart(canvas, config);

	// Funciones para actualizar el gráfico

	setTitles(
		graph,
		'Ecuador - Distribución de población migrante por grupo etario',
		'Total a mediados de 2020.',
		[
			'United Nations Department of Economic and Social Affairs, Population Division (2020).',
			'International Migrant Stock 2020 https://www.un.org/development/desa/pd/content/international-migrant-stock.',
			'Fecha de descarga: 6 Diciembre, 2021'
		]
	);
	updateGraph(graph, Object.values(rows.hoja1));

	// Funciones para descargar
	imgButton.onclick = () => {
		const filename = 'poblacion_total_migrante_2020.png';

		saveAsImg(filename, canvas);
	};

	fileButton.onclick = () => {
		saveExcelFile(url);
	};
});

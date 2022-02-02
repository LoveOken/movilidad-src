/* global Chart */
const Spreadsheet = require('./common/readSheets');

const createDataObject = require('./common/createDataObject');
const saveAsImg = require('./common/saveAsImg');
const saveExcelFile = require('./common/saveExcelFile');
const updateGraph = require('./common/updateGraph');
const colors = require('./common/colors');
const createConfigObject = require('./common/createConfigObject');
const displayAsAbsolute = require('./common/displayAsAbsolute');
const setTitles = require('./common/setTitles');

const url = document.getElementsByName('sheet-url')[0].content;

/* set up async GET request */
Spreadsheet.fetch(url, (file) => {
	// Cambiar estas variables cambiara los datos que se muestran
	const rows = {
		etiquetas: file.readColumn(4, 21, 'A', 'Hoja1').cells,
		hoja1: {
			mujeres: file.readColumn(4, 21, 'O', 'Hoja1').invert(),
			hombres: file.readColumn(4, 21, 'N', 'Hoja1')
		}
	};

	// Configura el gráfico en particular
	const data = createDataObject(rows.etiquetas, [colors.blue, colors.orange]);

	const config = createConfigObject('bar', data, {
		indexAxis: 'y',
		scales: {
			x: {
				stacked: true
			},
			y: {
				stacked: true,
				reverse: true
			}
		}
	});

	// Obtiene elementos de la página
	const canvas = document.getElementById('chart');
	const imgButton = document.getElementById('img-button');
	const fileButton = document.getElementById('file-button');

	const graph = new Chart(canvas, config);

	// Funciones para actualizar el gráfico
	setTitles(
		graph,
		'Ecuador - Distribución de población migrante por grupo etario y sexo',
		'Total a mediados de 2020.',
		[
			'United Nations Department of Economic and Social Affairs, Population Division (2020).',
			'International Migrant Stock 2020 https://www.un.org/development/desa/pd/content/international-migrant-stock.',
			'Fecha de descarga: 6 Diciembre, 2021'
		]
	);
	displayAsAbsolute('x', graph);
	updateGraph(graph, Object.values(rows.hoja1));

	// Funciones para descargar
	imgButton.onclick = () => {
		const filename = 'poblacion_migrante_por_sexo.png';

		saveAsImg(filename, canvas);
	};

	fileButton.onclick = () => {
		saveExcelFile(url);
	};
});

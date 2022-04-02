/* global Chart */
const Spreadsheet = require('./readSheets');

const createDataObject = require('./createDataObject');
const createConfigObject = require('./createConfigObject');

const displayUpdate = require('../display/displayUpdate');
const displayAsPercentage = require('../display/displayAsPercentage');
const displayAsAbsolute = require('../display/displayAsAbsolute');
const displayNormal = require('../display/displayNormal');
const displayTitles = require('../display/displayTitles');
const hideLabels = require('../display/hideLabels');

const saveAsImg = require('../downloaders/saveAsImg');
const saveExcelFile = require('../downloaders/saveExcelFile');
const displayZeroToHundred = require('../display/displayZeroToHundred');
const dynamicAspectRatio = require('../display/dynamicAspectRatio');

/**
 * Crea un gráfico utilizando Chart.js leyendo los datos de un archivo XSLX
 * @param {*} propiedades Propiedades del gráfico
 * @param {*} metodos Métodos del gráfico
 */

module.exports = (
	{ name = 'none', colors, type, options, ticks, labels = true },
	{ getData, getFilename, setFills, onFetch }
) => {
	// Busca los elementos utilizando el nombre dado en propiedades
	const url = document.getElementsByName(name + '-sheet-url')[0].content;
	const canvas = document.getElementById(name + '-chart');
	const select = document.getElementById(name + '-select');
	const imgButton = document.getElementById(name + '-img-button');
	const fileButton = document.getElementById(name + '-file-button');

	// Crea los objetos de configuración que utiliza ChartJS
	const data = createDataObject(new Array(ticks).fill(''), colors);
	const config = createConfigObject(type, data, options);

	// Arregla los rellenos de los gráficos si hay una función para aquello
	if (setFills) setFills(data);

	// Oculta las etiquetas en caso de que no sean necesarias
	if (!labels) hideLabels(config);

	// Genera el gráfico con ChartJS
	const chart = new Chart(canvas, config);

	Spreadsheet.fetch(url, (file) => {
		// Procesa los datos desde el archivo
		const rows = getData(file);

		data.labels = rows.etiquetas;

		// Funciones para actualizar el gráfico
		onFetch(rows, select, {
			update: displayUpdate.bind(chart),
			absolute: displayAsAbsolute.bind(chart),
			percentage: displayAsPercentage.bind(chart),
			normal: displayNormal.bind(chart),
			title: displayTitles.bind(chart),
			zero: displayZeroToHundred.bind(chart)
		});

		// Funciones para descargar
		imgButton.onclick = () => {
			const filename = getFilename(select);

			saveAsImg(filename + '.png', canvas);
		};

		fileButton.onclick = () => {
			saveExcelFile(url);
		};

		// Tamaño dinámico de gráfico
		// Depende del tamaño de la ventana
		let to;

		const handler = () => {
			dynamicAspectRatio(chart.config, canvas);

			chart.update();
		};

		window.addEventListener('resize', function () {
			clearTimeout(to);
			to = setTimeout(handler, 100);
		});

		handler();
	});
};

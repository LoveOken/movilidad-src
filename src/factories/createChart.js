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
const displayAtZero = require('../display/displayAtZero');

module.exports = (
	{ name = 'none', colors, type, options, ticks, labels = true },
	{ getRows, getFilename, setFills, onFetch }
) => {
	const url = document.getElementsByName(name + '-sheet-url')[0].content;
	const canvas = document.getElementById(name + '-chart');
	const select = document.getElementById(name + '-select');
	const imgButton = document.getElementById(name + '-img-button');
	const fileButton = document.getElementById(name + '-file-button');

	// Configura el gráfico en particular
	const data = createDataObject(new Array(ticks).fill(''), colors);
	const config = createConfigObject(type, data, options);

	if (setFills) setFills(data);
	if (!labels) hideLabels(config);

	const chart = new Chart(canvas, config);

	Spreadsheet.fetch(url, (file) => {
		// Cambiar estas variables cambiara los datos que se muestran
		const rows = getRows(file);

		data.labels = rows.etiquetas;

		// Funciones para actualizar el gráfico
		onFetch(rows, select, {
			update: displayUpdate.bind(chart),
			absolute: displayAsAbsolute.bind(chart),
			percentage: displayAsPercentage.bind(chart),
			normal: displayNormal.bind(chart),
			title: displayTitles.bind(chart),
			zero: displayAtZero.bind(chart)
		});

		// Funciones para descargar
		imgButton.onclick = () => {
			const filename = getFilename(select);

			saveAsImg(filename, canvas);
		};

		fileButton.onclick = () => {
			saveExcelFile(url);
		};
	});
};

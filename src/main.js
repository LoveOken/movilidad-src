const colors = require('./common/colors');
const createChart = require('./factories/createChart');
const Spreadsheet = require('./factories/readSheets');

const url =
	'https://cdn.statically.io/gh/LoveOken/movilidad-src/main/spreadsheets/EMAC_TraduccionGamma.xlsx';

Spreadsheet.fetch(url, (file) => {
	const code = document.documentElement.lang.startsWith('es') ? 'es' : 'en';
	const lang = {};

	Object.values(file.data).forEach((e) => {
		const id = e.id || '';
		lang[e.type + id] = e[code];
	});

	require('./graphs/graph1')(colors, lang, createChart);
	require('./graphs/graph2')(colors, lang, createChart);
	require('./graphs/graph3')(colors, lang, createChart);
	require('./graphs/graph4')(colors, lang, createChart);
	require('./graphs/graph5')(colors, lang, createChart);
	require('./graphs/graph6')(colors, lang, createChart);
	require('./graphs/graph7')(colors, lang, createChart);
});

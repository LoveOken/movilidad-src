const colors = require('./common/colors');
const englishTitles = require('./common/englishTitles');
const spanishTitles = require('./common/spanishTitles');
const createChart = require('./factories/createChart');

const lang = document.documentElement.lang.startsWith('es') ? spanishTitles : englishTitles;

require('./graphs/graph1')(colors, lang, createChart);
require('./graphs/graph2')(colors, lang, createChart);
require('./graphs/graph3')(colors, lang, createChart);
require('./graphs/graph4')(colors, lang, createChart);
require('./graphs/graph5')(colors, lang, createChart);
require('./graphs/graph6')(colors, lang, createChart);
// require('./graph7')(colors, lang, createChart);

const createDataset = require('./createDataset');

/**
 * Crea el objeto que indica los datos a ChartJS
 * @param {Array<String>} labels Nombres de etiquetas 
 * @param {Array<String>} colors Colores en hexadecimal
 * @returns {*} Objeto de datos
 */

module.exports = (labels, colors) => {
	return {
		labels,
		datasets: colors.map(createDataset)
	};
};

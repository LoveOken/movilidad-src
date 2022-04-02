/**
 * Crea un set de datos con valores indefinidos
 * @param {String} hex Color en hexadecimal
 * @returns {*} Set de datos
 */

module.exports = (hex) => {
	return {
		label: '',
		fill: true,
		borderWidth: 1,
		borderColor: hex,
		backgroundColor: hex + 'AA',
		data: []
	};
};

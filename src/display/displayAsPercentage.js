/**
 * Muestra los valores como porcentaje
 * @param {String} axis Nombre del eje
 * @param {Number} multiplier Multiplicador de porcentaje
 * @param {Number} fixed Cantidad de decimales
 */

module.exports = function (axis, multiplier = 1, fixed = 0) {
	// Substitucion en el eje
	this.options.scales[axis].ticks.callback = function (value) {
		return parseFloat(value * multiplier).toFixed(fixed) + '%';
	};

	// Substitucion en la etiqueta
	this.options.plugins.tooltip.callbacks.label = function (context) {
		let label = context.dataset.label || '';

		if (label) {
			label += ': ';
		}

		if (context.parsed[axis] !== null) {
			label += parseFloat(context.parsed[axis] * multiplier).toFixed(1) + '%';
		}

		return label;
	};
};

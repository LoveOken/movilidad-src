/**
 * Muestra los valores como normales
 * @param {String} axis Nombre del Eje
 */

module.exports = function (axis) {
	// Divide los numeros por miles
	const thousands = function (value) {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	};

	// Substitucion en el eje
	this.options.scales[axis].ticks.callback = thousands;

	// Substitucion en la etiqueta
	this.options.plugins.tooltip.callbacks.label = function (context) {
		let label = context.dataset.label || '';

		if (label) {
			label += ': ';
		}

		if (context.parsed[axis] !== null) {
			label += thousands(context.parsed[axis]);
		}

		return label;
	};
};

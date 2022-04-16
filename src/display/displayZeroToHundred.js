const displayAsPercentage = require('./displayAsPercentage');

/**
 * Muestra los valores acumulados del 1 al 100
 * @param {Boolean} isNotPercentageValue Muestra los valores como porcentaje
 */

module.exports = function (isNotPercentageValue) {
	let perc = displayAsPercentage.bind(this);

	// Si no es porcentaje, muestra los numeros normales
	if (isNotPercentageValue) {
		this.options.plugins.legend.onClick = undefined;

		this.options.scales.y.max = undefined;
	} else {
		// Si es porcentaje, muestra los numeros del 1 al 100
		this.options.plugins.legend.onClick = function (e, legendItem, legend) {
			const index = legendItem.datasetIndex;
			const ci = legend.chart;

			if (ci.isDatasetVisible(index)) {
				ci.hide(index);

				if (index === 0) {
					ci.options.scales.y.max = undefined;
					perc('y', 100, 1);
				}
				legendItem.hidden = true;
			} else {
				ci.show(index);

				if (index === 0) {
					ci.options.scales.y.max = 1;
					perc('y', 100);
				}
				legendItem.hidden = false;
			}

			ci.update();
		};

		if (this.isDatasetVisible(0)) {
			this.options.scales.y.max = 1;
			perc('y', 100);
		} else {
			this.options.scales.y.max = undefined;
			perc('y', 100, 1);
		}
	}
};

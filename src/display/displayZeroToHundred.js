const displayAsPercentage = require('./displayAsPercentage');

module.exports = function (isPercentageValue) {
	let perc = displayAsPercentage.bind(this);

	if (isPercentageValue) {
		this.options.plugins.legend.onClick = undefined;

		this.options.scales.y.max = undefined;
	} else {
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

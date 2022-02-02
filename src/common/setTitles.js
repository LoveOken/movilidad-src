module.exports = (chart, title, subtitle, source) => {
	chart.options.plugins.title.text = title;
	chart.options.plugins.legend.title.text = subtitle;
	chart.options.plugins.subtitle.text = source;
};

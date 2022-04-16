/**
 * Actualiza los titulos de los gráficos
 * @param {String} title
 * @param {String} subtitle
 * @param {String} source
 */

module.exports = function (title, subtitle, source) {
	this.options.plugins.title.text = title;
	this.options.plugins.legend.title.text = subtitle;
	this.options.plugins.subtitle.text = source;
};

/**
 * Actualiza los titulos de los gráficos
 * @param {String} title
 * @param {String} subtitle
 * @param {String} source
 */

module.exports = function (title, subtitle, source) {
	this.options.plugins.title.text = title.split('{n}');
	this.options.plugins.legend.title.text = subtitle.split('{n}');
	this.options.plugins.subtitle.text = source.split('{n}');
};

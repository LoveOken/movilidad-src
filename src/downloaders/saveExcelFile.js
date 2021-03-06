/**
 * Descarga el archivo Excel
 * @param {String} url URL del archivo
 */

module.exports = (url) => {
	if (navigator.msSaveBlob) {
		fetch(url)
			.then((r) => r.blob())
			.then((blob) => navigator.msSaveBlob(blob, 'datos.xlsx'));
	} else {
		const link = document.createElement('a');

		link.href = url;

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
};

/**
 * Descarga el canvas como una imagen
 * @param {String} filename Nombre del archivo
 * @param {HTMLCanvasElement} canvas Elemento canvas
 */

module.exports = (filename, canvas) => {
	// Compatibilidad
	if (navigator.msSaveBlob) {
		canvas.toBlob((blob) => navigator.msSaveBlob(blob, filename));
	} else {
		// Metodo moderno con enlace
		const link = document.createElement('a');

		link.download = filename;
		link.href = canvas.toDataURL();

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
};

module.exports = (filename, canvas) => {
	if (navigator.msSaveBlob) {
		canvas.toBlob((blob) => navigator.msSaveBlob(blob, filename));
	} else {
		const link = document.createElement('a');

		link.download = filename;
		link.href = canvas.toDataURL();

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
};

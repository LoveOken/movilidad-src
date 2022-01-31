module.exports = (filename, url) => {
	if (navigator.msSaveBlob) {
		fetch(url)
			.then((r) => r.blob())
			.then((blob) => navigator.msSaveBlob(blob, filename));
	} else {
		const link = document.createElement('a');

		link.download = filename;
		link.href = url;

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
};

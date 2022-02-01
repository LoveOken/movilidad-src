module.exports = (url) => {
	if (navigator.msSaveBlob) {
		fetch(url)
			.then((r) => r.blob())
			.then((blob) => navigator.msSaveBlob(blob));
	} else {
		const link = document.createElement('a');

		link.href = url;

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
};

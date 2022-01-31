module.exports = (hex, fill, borderWidth) => {
	return {
		label: 'Cargando…',
		fill,
		borderWidth,
		borderColor: hex,
		backgroundColor: hex + 'FF',
		data: []
	};
};

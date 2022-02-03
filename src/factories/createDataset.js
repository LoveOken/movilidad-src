module.exports = (hex) => {
	return {
		label: 'Cargando…',
		fill: true,
		borderWidth: 1,
		borderColor: hex,
		backgroundColor: hex + '10',
		data: []
	};
};

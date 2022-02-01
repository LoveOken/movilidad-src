module.exports = (hex, index) => {
	const config = {
		label: 'Cargando…',
		fill: 'origin',
		borderWidth: 2,
		borderColor: hex,
		backgroundColor: hex + '20',
		data: []
	};

	if (index > 0) delete config.fill;

	return config;
};

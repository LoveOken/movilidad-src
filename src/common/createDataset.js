module.exports = (rgb) => {
	return {
		label: 'Cargando…',
		fill: true,
		borderWidth: 1,
		borderColor: `rgba(${rgb}, 1)`,
		backgroundColor: `rgba(${rgb}, .1)`,
		data: []
	};
};

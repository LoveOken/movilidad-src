module.exports = (value) => {
	if (document.documentElement.lang === 'es') {
		return value;
	}

	switch (value) {
		case 'Preescolar':
			return 'Preprimary';
		case 'Primaria':
			return 'Primary';
		case 'Secundaria':
			return 'Secondary';
		case 'Terciaria':
			return 'Terciary';
		case 'Mujeres':
			return 'Female';
		case 'Hombres':
			return 'Male';
		case 'Perú':
			return 'Peru';
		case 'Otros Países de América':
			return 'Other American Countries';
		case 'Otros Continentes':
			return 'Other Continents';
		default:
			return value;
	}
};

/* global XLSX */

/**
 * Objeto que representa al archivo excel
 */

class Spreadsheet {
	constructor(arr) {
		const workbook = XLSX.read(new Uint8Array(arr), { type: 'array' });
		const worksheet = workbook.Sheets['Hoja 1'];

		// El atributo data tiene acceso a los datos de Excel
		this.data = XLSX.utils.sheet_to_json(worksheet);
		this.lang = {};

		console.log(this.data);
	}

	/**
	 * Crear un set de valores que se pueden utilizar para representar en el gráfico
	 * @param {String} label Etiqueta
	 * @param {Array<Number>} cells Valores
	 * @returns {*} Set de valores
	 */

	createValues(label, cells) {
		return {
			label: this.lang[label] || label,
			cells,
			shift: function () {
				this.cells.shift();

				return this;
			},
			invert: function () {
				this.cells = this.cells.map((c) => -c);

				return this;
			},
			nullify: function () {
				this.cells = this.cells.map((c) => (typeof c === 'undefined' ? -10000 : c));

				return this;
			}
		};
	}

	/**
	 * Busca una fila del archivo y genera valores usables en el gráfico
	 * @param {String} code Codigo del país
	 * @param {String} param Nombre de la variable a buscar
	 * @param {Array<String>} labels
	 * @returns
	 */

	readRow(code, param, labels) {
		// Busca en el archivo una fila con el parametro y codigo correspondiente
		const row = this.data.find((r) => r.cod_pais === code && r.parametro === param);

		if (row) {
			// Mapea según etiquetas predeterminadas
			const values = labels.map((v) => row[v]);

			return this.createValues(param, values);
		} else {
			throw new Error(
				'The country code/parameter is invalid - El código país/parametro es invalido.'
			);
		}
	}

	readMany(code, param, labels) {
		// Busca en el archivo filas con el parametro y codigo correspondiente
		const rows = this.data.filter((r) => r.cod_pais === code && r.parametro === param);

		if (rows.length > 0) {
			const result = {};

			rows.forEach((row) => {
				// Mapea según etiquetas predeterminadas
				const values = labels.map((v) => row[v]);

				result[row.pais_origen] = this.createValues(row.pais_origen, values);
			});

			return result;
		} else {
			throw new Error(
				'The country code/parameter is invalid - El código país/parametro es invalido.'
			);
		}
	}

	setLang(lang) {
		this.lang = lang;
	}

	/**
	 * Busca el archivo excel desde una URL
	 * @param {String} url URL del archivo
	 * @param {Function} cb Funcion que manipula el archivo
	 */

	static fetch(url, cb) {
		fetch(url)
			.then((r) => r.arrayBuffer())
			.then((arr) => {
				const file = new Spreadsheet(arr);

				cb(file);
			});
	}
}

module.exports = Spreadsheet;

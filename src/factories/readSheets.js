/* global XLSX */

const translateLabels = require('../common/translateLabels');

/**
 * Objeto que representa al archivo excel
 */

class Spreadsheet {
	constructor(arr) {
		const workbook = XLSX.read(new Uint8Array(arr), { type: 'array' });
		const worksheet = workbook.Sheets['Hoja 1'];

		this.data = XLSX.utils.sheet_to_json(worksheet);

		console.log(this.data, Object.keys(this.data[0]));
	}

	/**
	 * Crear un set de valores que se pueden utilizar para representar en el gráfico
	 * @param {String} label Etiqueta
	 * @param {Array<Number>} cells Valores
	 * @returns {*} Set de valores
	 */

	createValues(label, cells) {
		return {
			label: translateLabels(label),
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
		const row = this.data.find((r) => r.cod_pais === code && r.parametro === param);

		if (row) {
			const values = labels.map((v) => row[v]);

			return this.createValues(param, values);
		} else {
			throw new Error(
				'The country code/parameter is invalid - El código país/parametro es invalido.'
			);
		}
	}

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

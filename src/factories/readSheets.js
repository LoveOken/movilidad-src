/* global XLSX */

class Spreadsheet {
	constructor(arr) {
		this.sheets = XLSX.read(new Uint8Array(arr), { type: 'array' }).Sheets;
	}

	readValue(cell, sheetname) {
		try {
			return this.sheets[sheetname][cell].v;
		} catch (err) {
			return undefined;
		}
	}

	createValues(label, cells) {
		return {
			label,
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

	readRow(length, row, sheetname) {
		let label;
		const cells = [];

		for (let i = 0; i < length; i++) {
			const cell = String.fromCharCode(i + 65) + row;
			const value = this.readValue(cell, sheetname);

			if (i === 0) {
				label = value;
			} else {
				cells.push(value);
			}
		}

		return this.createValues(label, cells);
	}

	readColumn(start, end, column, sheetname) {
		let label;
		const cells = [];

		for (let i = start; i < end; i++) {
			const cell = column + i;
			const value = this.readValue(cell, sheetname);

			if (i === start) {
				label = value;
			} else {
				cells.push(value);
			}
		}

		return this.createValues(label, cells);
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

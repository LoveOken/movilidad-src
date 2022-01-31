module.exports = (graph, rows) => {
	let i = 0;

	for (const dataset of graph.data.datasets) {
		dataset.label = rows[i].label;
		dataset.data = rows[i].cells.map(Number);
		i++;
	}

	graph.update();
};

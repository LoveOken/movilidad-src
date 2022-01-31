module.exports = {
	id: 'custom_canvas_background_color',
	beforeDraw: (chart) => {
		const ctx = chart.canvas.getContext('2d');

		ctx.save();

		ctx.fillStyle = 'white';
		ctx.globalCompositeOperation = 'destination-over';
		ctx.fillRect(0, 0, chart.width, chart.height);

		ctx.restore();
	}
};

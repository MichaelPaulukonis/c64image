const color_helper = require('../lib/color_helper');
const quantize = require('../lib/quantize');

let pixel_container;

let config = {};
let colorMap;
let maximumColorCount = 16;

function init(data) {
	pixel_container = data;
}

async function get_palette(maxColor) {
	maximumColorCount = maxColor ? maxColor : maximumColorCount;
	const palette = await grab_palette();
	return palette;
}

function grab_palette() {
	return new Promise(resolve => {
		const pixels = [];

		for (let x = 1; x < pixel_container.get_width() - 1; ++x) {
			for (let y = 1; y < pixel_container.get_height() - 1; ++y) {
				let r = pixel_container.get(x, y, 0),
					g = pixel_container.get(x, y, 1),
					b = pixel_container.get(x, y, 2);
				pixels.push([r, g, b]);
			}
		}

		colorMap = quantize(pixels, maximumColorCount);
		resolve(colorMap.palette());
	});
}

function on_pixel(x, y, options) {
	let r = pixel_container.get(x, y, 0),
		g = pixel_container.get(x, y, 1),
		b = pixel_container.get(x, y, 2);

	const new_color = colorMap.map([r, g, b]);

	pixel_container.set(x, y, new_color[0], new_color[1], new_color[2]);
}

module.exports = { init, get_palette };

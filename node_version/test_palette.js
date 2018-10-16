const fs = require('fs');
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');

const filter = require('./filters/filter');
const chrono = require('./chrono');
const pixel_container = require('./lib/pixel_container');

let file = 'assets/sources/mariage.jpg';

getPixels(file, (err, data) => {
	if (err) {
		console.log('Bad image path');
		return;
	}

	pixel_container.init(data);

	console.log('pixels to proceed : ', pixel_container.get_width() * pixel_container.get_height(), 'px');

	filter.init(pixel_container);

	chrono.start();

	filter.quantize_color
		.get_palette(32)
		.then(image_palette => {
			for (let i = 1; i < pixel_container.get_width() - 1; ++i) {
				for (let j = 1; j < pixel_container.get_height() - 1; ++j) {
					//filter.quantize_color.on_pixel(i, j);
					filter.palette.on_pixel(i, j, { palette: image_palette });
					filter.pixelate.on_pixel(i, j);
				}
			}

			chrono.stop();

			let file_type = 'png'; //file.split('.').pop();

			var result_file = fs.createWriteStream('assets/filtered.' + file_type);
			savePixels(pixel_container.get_pixels(), file_type, { quality: 90 }).pipe(result_file);

			console.log(`image filtered in ${chrono.get_result()} ms`);
		})
		.catch(err => console.log(err.message));
});

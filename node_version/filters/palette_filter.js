const color_helper = require('../lib/color_helper');

let pixel_container;

let config = {
	c64: [
		[0, 0, 0],
		[62, 49, 162],
		[87, 66, 0],
		[140, 62, 52],
		[84, 84, 84],
		[141, 71, 179],
		[144, 95, 37],
		[124, 112, 218],
		[128.0, 128.0, 129.0],
		[104.0, 169.0, 65.0],
		[187.0, 119.0, 109.0],
		[122.0, 191.0, 199.0],
		[171.0, 171.0, 171.0],
		[208.0, 220.0, 113.0],
		[172.0, 234.0, 136.0],
		[255.0, 255.0, 255.0]
	],
	vic20: [[255, 255, 255], [234, 180, 137], [120, 41, 34], [184, 105, 98], [135, 214, 221], [170, 95, 182], [26, 130, 38], [191, 206, 114]],
	teletext: [[0, 0, 255], [255, 0, 0], [100, 0, 100], [0, 255, 0], [0, 255, 255], [255, 255, 0], [255, 255, 255]],
	cga: [
		[0, 0, 0],
		[26, 0, 166],
		[17, 120, 0],
		[40, 158, 118],
		[105, 0, 26],
		[128, 25, 171],
		[118, 145, 0],
		[164, 164, 164],
		[72, 72, 72],
		[118, 91, 255],
		[109, 212, 65],
		[132, 250, 210],
		[197, 78, 118],
		[220, 117, 255],
		[210, 237, 70],
		[255, 255, 255]
	],
	gameboy: [[156, 189, 15], [140, 173, 15], [48, 98, 48], [15, 56, 15]],
	nes: [
		[124, 124, 124],
		[0, 0, 252],
		[0, 0, 188],
		[68, 40, 188],
		[148, 0, 132],
		[168, 0, 32],
		[168, 16, 0],
		[136, 20, 0],
		[80, 48, 0],
		[0, 120, 0],
		[0, 104, 0],
		[0, 88, 0],
		[0, 64, 88],
		[0, 0, 0],
		[188, 188, 188],
		[0, 120, 248],
		[0, 88, 248],
		[104, 68, 252],
		[216, 0, 204],
		[228, 0, 88],
		[248, 56, 0],
		[228, 92, 16],
		[172, 124, 0],
		[0, 184, 0],
		[0, 168, 0],
		[0, 168, 68],
		[0, 136, 136],
		[248, 248, 248],
		[60, 188, 252],
		[104, 136, 252],
		[152, 120, 248],
		[248, 120, 248],
		[248, 88, 152],
		[248, 120, 88],
		[252, 160, 68],
		[248, 184, 0],
		[184, 248, 24],
		[88, 216, 84],
		[88, 248, 152],
		[0, 232, 216],
		[120, 120, 120],
		[252, 252, 252],
		[164, 228, 252],
		[184, 184, 248],
		[216, 184, 248],
		[248, 184, 248],
		[248, 164, 192],
		[240, 208, 176],
		[252, 224, 168],
		[248, 216, 120],
		[216, 248, 120],
		[184, 248, 184],
		[184, 248, 216],
		[0, 252, 252],
		[248, 216, 248]
	],
	black_white: [[0, 0, 0], [255, 255, 255]],
	web: [
		[205, 92, 92],
		[240, 128, 128],
		[250, 128, 114],
		[233, 150, 122],
		[255, 160, 122],
		[255, 0, 0],
		[220, 20, 60],
		[178, 34, 34],
		[139, 0, 0],
		[255, 192, 203],
		[255, 182, 193],
		[255, 105, 180],
		[255, 20, 147],
		[199, 21, 133],
		[219, 112, 147],
		[255, 160, 122],
		[255, 127, 80],
		[255, 99, 71],
		[255, 69, 0],
		[255, 140, 0],
		[255, 165, 0],
		[255, 215, 0],
		[255, 255, 0],
		[255, 255, 224],
		[255, 250, 205],
		[250, 250, 210],
		[255, 239, 213],
		[255, 228, 181],
		[255, 218, 185],
		[238, 232, 170],
		[240, 230, 140],
		[189, 183, 107],
		[230, 230, 250],
		[216, 191, 216],
		[221, 160, 221],
		[238, 130, 238],
		[218, 112, 214],
		[255, 0, 255],
		[255, 0, 255],
		[186, 85, 211],
		[147, 112, 219],
		[138, 43, 226],
		[148, 0, 211],
		[153, 50, 204],
		[139, 0, 139],
		[128, 0, 128],
		[75, 0, 130],
		[72, 61, 139],
		[106, 90, 205],
		[123, 104, 238],
		[173, 255, 47],
		[127, 255, 0],
		[124, 252, 0],
		[0, 255, 0],
		[50, 205, 50],
		[152, 251, 152],
		[144, 238, 144],
		[0, 250, 154],
		[0, 255, 127],
		[60, 179, 113],
		[46, 139, 87],
		[34, 139, 34],
		[0, 128, 0],
		[0, 100, 0],
		[154, 205, 50],
		[107, 142, 35],
		[128, 128, 0],
		[85, 107, 47],
		[102, 205, 170],
		[143, 188, 143],
		[32, 178, 170],
		[0, 139, 139],
		[0, 128, 128],
		[0, 255, 255],
		[0, 255, 255],
		[224, 255, 255],
		[175, 238, 238],
		[127, 255, 212],
		[64, 224, 208],
		[72, 209, 204],
		[0, 206, 209],
		[95, 158, 160],
		[70, 130, 180],
		[176, 196, 222],
		[176, 224, 230],
		[173, 216, 230],
		[135, 206, 235],
		[135, 206, 250],
		[0, 191, 255],
		[30, 144, 255],
		[100, 149, 237],
		[65, 105, 225],
		[0, 0, 255],
		[0, 0, 205],
		[0, 0, 139],
		[0, 0, 128],
		[25, 25, 112],
		[255, 248, 220],
		[255, 235, 205],
		[255, 228, 196],
		[255, 222, 173],
		[245, 222, 179],
		[222, 184, 135],
		[210, 180, 140],
		[188, 143, 143],
		[244, 164, 96],
		[218, 165, 32],
		[184, 134, 11],
		[205, 133, 63],
		[210, 105, 30],
		[139, 69, 19],
		[160, 82, 45],
		[165, 42, 42],
		[128, 0, 0],
		[255, 255, 255],
		[255, 250, 250],
		[240, 255, 240],
		[245, 255, 250],
		[240, 255, 255],
		[240, 248, 255],
		[248, 248, 255],
		[245, 245, 245],
		[255, 245, 238],
		[245, 245, 220],
		[253, 245, 230],
		[255, 250, 240],
		[255, 255, 240],
		[250, 235, 215],
		[250, 240, 230],
		[255, 240, 245],
		[255, 228, 225],
		[220, 220, 220],
		[211, 211, 211],
		[192, 192, 192],
		[169, 169, 169],
		[128, 128, 128],
		[105, 105, 105],
		[119, 136, 153],
		[112, 128, 144],
		[47, 79, 79],
		[0, 0, 0]
	],
	/*lab: [
        [0,0,0], [28.97789348020777, 39.03488183293191, -59.19594490162029]
    ]*/
	// https://en.wikipedia.org/wiki/List_of_color_palettes
	// https://mrob.com/pub/xapple2/colors.html
	apple2: [
		[0, 0, 0],
		[156, 156, 156],
		[255, 255, 255],
		[96, 78, 189],
		[208, 195, 255],
		[255, 68, 253],
		[227, 30, 96],
		[255, 160, 208],
		[255, 106, 60],
		[96, 114, 3],
		[208, 221, 141],
		[20, 245, 60],
		[0, 163, 96],
		[114, 255, 208],
		[20, 207, 253]
	]
};

// @todo : gain de perf en stockant directement la palette en LAB / http://colormine.org/convert/rgb-to-lab

function init(data) {
	pixel_container = data;
}

/**
 *
 * @param {integer} x
 * @param {integer} y
 * @param {object} options nam{string} : nom de la palette
 */
function on_pixel(x, y, options) {
	let match = [0, 0, 0],
		best_dot = 100,
		color = color_helper.rgb2lab([pixel_container.get(x, y, 0), pixel_container.get(x, y, 1), pixel_container.get(x, y, 2)]);

	if (options.name && typeof config[options.name] !== 'undefined') {
		palette = config[options.name];
	} else if (options.palette) {
		palette = options.palette;
	} else {
		console.log('Palette filter error : no palette found (no name, no palette array)');
		return;
	}

	for (let c = palette.length - 1; c > 0; c--) {
		let p = palette[c],
			this_dot = color_helper.deltaE(color_helper.rgb2lab(p), color);

		if (this_dot < best_dot) {
			best_dot = this_dot;
			match = p;
		}
	}

	pixel_container.set(x, y, match[0], match[1], match[2]);
}

module.exports = { init, on_pixel };

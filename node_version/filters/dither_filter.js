const color_helper = require('../lib/color_helper');

let pixel_container;

let config = {
    map8: [0, 32, 8, 40, 2, 32, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21],
    map4: [15, 135, 45, 165, 195, 75, 225, 105, 60, 180, 30, 150, 240, 120, 210, 90],
};


function init(data) {
    pixel_container = data;
}

function on_pixel(x, y, options = { name: "bayer" }) {

    let r, g, b;

    switch (options.name) {

        case "bayer4":
            [r, g, b] = bayer(4, x, y);
            break;

        case "bayer8":
            [r, g, b] = bayer(8, x, y);
            break;

        case "floyd_steinberg":
            [r, g, b] = floyd_steinberg(x, y);
            break;

        case "jjn":
            [r, g, b] = jjn(x, y);
            break;

        case "atkinson":
            [r, g, b] = atkinson(x, y);
            break;

        default:
            console.log("Dither filter error : algo not found");
    }

    pixel_container.set(x, y, r, g, b);
}

// Sources
// http://www.tannerhelland.com/4660/dithering-eleven-algorithms-source-code/
// http://www.efg2.com/Lab/Library/ImageProcessing/DHALF.TXT


// --------------------- J A R V I S  J U D I C E  N I N K E ------------------------

function jjn(x, y) {

    let r = jjn_channel(x, y, 0);
    let g = jjn_channel(x, y, 1);
    let b = jjn_channel(x, y, 2);

    return [r, g, b];
}

function jjn_channel(x, y, channel) {

    let cc = pixel_container.get(x, y, channel);
    let rc = (cc < 128) ? 0 : 255;
    let err = cc - rc;
    let o48 = 1 / 48;

    diffuse_error(x + 1, y, (err * 7) * o48, channel);
    diffuse_error(x + 2, y, (err * 5) * o48, channel);

    diffuse_error(x - 2, y + 1, (err * 3) * o48, channel);
    diffuse_error(x - 1, y + 1, (err * 5) * o48, channel);
    diffuse_error(x, y + 1, (err * 7) * o48, channel);
    diffuse_error(x + 1, y + 1, (err * 5) * o48, channel);
    diffuse_error(x + 2, y + 1, (err * 3) * o48, channel);

    diffuse_error(x - 2, y + 2, (err) * o48, channel);
    diffuse_error(x - 1, y + 2, (err * 3) * o48, channel);
    diffuse_error(x, y + 2, (err * 5) * o48, channel);
    diffuse_error(x + 1, y + 2, (err * 3) * o48, channel);
    diffuse_error(x + 2, y + 2, (err) * o48, channel);

    return rc;
}


// --------------------- A T K I N S O N ------------------------

function atkinson(x, y) {

    let r = atkinson_channel(x, y, 0);
    let g = atkinson_channel(x, y, 1);
    let b = atkinson_channel(x, y, 2);

    return [r, g, b];
}

function atkinson_channel(x, y, channel) {

    let cc = pixel_container.get(x, y, channel);
    let rc = (cc < 128) ? 0 : 255;
    let err = (cc - rc) >> 2;

    diffuse_error(x + 1, y, err, channel);
    diffuse_error(x + 2, y, err, channel);
    diffuse_error(x - 1, y + 1, err, channel);
    diffuse_error(x, y + 1, err, channel);
    diffuse_error(x + 1, y + 1, err, channel);
    diffuse_error(x, y + 2, err, channel);

    return rc;
}


// --------------------- F L O Y D  S T E I N B E R G ------------------------

// https://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering

function floyd_steinberg(x, y) {

    let r = pixel_channel(x, y, 0);
    let g = pixel_channel(x, y, 1);
    let b = pixel_channel(x, y, 2);

    return [r, g, b];
}

function pixel_channel(x, y, channel) {

    let cc = pixel_container.get(x, y, channel);       // current color
    let rc = (cc < 128) ? 0 : 255;             // real (rounded) color
    let err = cc - rc;                   // error amount

    diffuse_error(x + 1, y, (err * 7) >> 4, channel);
    diffuse_error(x - 1, y + 1, (err * 3) >> 4, channel);
    diffuse_error(x, y + 1, (err * 5) >> 4, channel);
    diffuse_error(x + 1, y + 1, (err * 1) >> 4, channel);

    return rc;
}

function diffuse_error(x, y, error, channel) {

    c = pixel_container.get(x, y);
    c[channel] = pixel_container.clamp_color(c[channel] + error);

    pixel_container.set(x, y, c[0], c[1], c[2]);
}


// --------------------- B A Y E R ------------------------

function bayer(dim, x, y) {

    let nx = parseInt(x % dim);
    let ny = parseInt(y % dim);

    let r = find_closest(dim, nx, ny, pixel_container.get(x, y, 0));
    let g = find_closest(dim, nx, ny, pixel_container.get(x, y, 1));
    let b = find_closest(dim, nx, ny, pixel_container.get(x, y, 2));

    return [r, g, b];
}

function find_closest(dim, x, y, c) {

    let limit = 0;

    if (x < dim) {
        let index = x + (y * dim);
        let map = (dim == 8) ? config.map8 : config.map4;
        limit = (map[index] + 1) * (dim * .5); ///64.0;
    }

    if (c < limit) {
        return 0;
    }

    return 255;
}

module.exports = { init, on_pixel };
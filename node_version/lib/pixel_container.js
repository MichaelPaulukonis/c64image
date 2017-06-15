
let pixels,
    type,
    width = 0,
    height = 0;

function init(data) {

    pixels = data;
    type = (Array.isArray(data)) ? 'array' : 'ndarray';
    width = data.shape[0];
    height = data.shape[1];
}

function get(x, y, c = -1) {
    if (c < 0) {
        return [pixels.get(x, y, 0),
        pixels.get(x, y, 1),
        pixels.get(x, y, 2)
        ];
    } else {
        return pixels.get(x, y, c);
    }
}

function set(x, y, r, g, b) {
    pixels.set(x, y, 0, r);
    pixels.set(x, y, 1, g);
    pixels.set(x, y, 2, b);
}

function get_pixels() {
    return pixels;
}

function get_width() {
    return width;
}

function get_height() {
    return height;
}

function get_type() {
    return type;
}

function clamp_color(num) {
    return num <= 0 ? 0 : num >= 255 ? 255 : num;
}

module.exports = { get_width, get_height, get_type, init, get_pixels, clamp_color, get, set };
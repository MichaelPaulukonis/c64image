const color_helper = require('../lib/color_helper');

let pixel_container;

let config = {
};

function init(data) {
    pixel_container = data;
}

function on_pixel(x, y, options = { amount: 50 }) {

    let contrast = (options.amount / 100) + 1;  //convert to decimal & shift range: [0..2]
    let intercept = 128 * (1 - contrast);

    let r = pixel_container.get(x, y, 0) * contrast + intercept,
        g = pixel_container.get(x, y, 1) * contrast + intercept,
        b = pixel_container.get(x, y, 2) * contrast + intercept;

    pixel_container.set(x, y,
        pixel_container.clamp_color(r),
        pixel_container.clamp_color(g),
        pixel_container.clamp_color(b)
    );
}

module.exports = { init, on_pixel };
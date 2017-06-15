const color_helper = require('../lib/color_helper');

let pixel_container;

let config = {
};

// sRGB luminance(Y) values

const rY = 0.212655;
const gY = 0.715158;
const bY = 0.072187;

function init(data) {
    pixel_container = data;
}

function on_pixel(x, y, options = { name: 'luminance' }) {

    if (typeof algo[options.name] === 'undefined') {
        console.log('To gray gilter error : algo name unknown');
        return;
    }

    config.options = options;

    if (config.options.number) {
        config.options.number = Math.min(config.options.number, 256);
        config.options.number = Math.max(config.options.number, 0);
    }

    let luma = algo[options.name](pixel_container.get(x, y, 0), pixel_container.get(x, y, 1), pixel_container.get(x, y, 2))
    pixel_container.set(x, y, luma, luma, luma);
}

const algo = {
    average: (r, g, b) => (r + g + b) * .3333,
    hsp: (r, g, b) => Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b),
    luminance: (r, g, b) => (rY * r) + (gY * g) + (bY * b),
    luminance_correct_gamma: (r, g, b) => gam_sRGB(
        rY * inv_gam_sRGB(r) +
        gY * inv_gam_sRGB(g) +
        bY * inv_gam_sRGB(b)
    ),
    desaturate: (r, g, b) => (Math.max(r, g, b) + Math.min(r, g, b)) * .5,
    decomposition_min: (r, g, b) => Math.min(r, g, b),
    decomposition_max: (r, g, b) => Math.max(r, g, b),
    green: (r, g, b) => g,
    shade: (r, g, b) => {
        let n = config.options.number || 8,
            factor = 255 / (n - 1),
            avg = (r + g + b) / 3;
        return parseInt(((avg / factor) + .5)) * factor
    }
};

// HSP Color Model
// http://alienryderflex.com/hsp.html


// Luminance Photometric/digital ITU BT.709:
// https://en.wikipedia.org/wiki/Relative_luminance


// ----------------- L U M I N A N C E  C O R R E C T  G A M M A ----------------------------
// https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color


// sRGB "gamma" function (approx 2.2)
function gam_sRGB(v) {

    if (v <= 0.0031308) {
        v *= 12.92;
    } else {
        v = 1.055 * Math.pow(v, 1.0 / 2.4) - 0.055;
    }
    return parseInt(v * 255 + .5);
}

// Inverse of sRGB "gamma" function. (approx 2.2)
function inv_gam_sRGB(ic) {

    let c = ic / 255.0;

    if (c <= 0.04045) {
        return c / 12.92;
    } else {
        return Math.pow(((c + 0.055) / (1.055)), 2.4);
    }
}

module.exports = { init, on_pixel };
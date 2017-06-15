// filter module

const palette = require('./palette_filter');
const dither = require('./dither_filter');
const contrast = require('./contrast_filter');
const grayscale = require('./grayscale_filter');
const pixelate = require('./pixelate_filter');

let pixel_container;

function init(container) {

    pixel_container = container;

    // init all filters

    palette.init(pixel_container);
    dither.init(pixel_container);
    contrast.init(pixel_container);
    grayscale.init(pixel_container);
    pixelate.init(pixel_container);
}

module.exports = { init, palette, dither, contrast, grayscale, pixelate };
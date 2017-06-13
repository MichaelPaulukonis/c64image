// filter module

const palette   = require('./palette_filter');
const dither    = require('./dither_filter');
const contrast  = require('./contrast_filter');
const to_gray   = require('./to_gray_filter');
const pixelate  = require('./pixelate_filter');

let pixel_container;

function init( container ){

    pixel_container = container;

    // init all filters

    palette.init(pixel_container);
    dither.init(pixel_container);
    contrast.init(pixel_container);
    to_gray.init(pixel_container);
    pixelate.init(pixel_container);
}

module.exports = { init, palette, dither, contrast, to_gray, pixelate };

const palette = require('./palette_filter');
const dither  = require('./dither_filter');
const contrast  = require('./contrast_filter');
const to_gray  = require('./to_gray_filter');
const pixelate  = require('./pixelate_filter');

let data = {
    pixels: {},
    type: ''
};

function init( datas ){

    // type of data

    data.type = (Array.isArray(datas)) ? 'array' : 'ndarray';
    data.pixels = datas;

    // init all filters

    palette.init(data);
    dither.init(data);
    contrast.init(data);
    to_gray.init(data);
    pixelate.init(data);
}

module.exports = { init, palette, dither, contrast, to_gray, pixelate };
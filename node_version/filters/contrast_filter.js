const color_helper = require('./color_helper');
const pixel_helper = require('./pixel_helper');

let pixels, pixels_type;

let config = {   
   };

function init( data ){
    pixels = data.pixels;
    pixels_type = data.type;
}

function on_pixel(x,y, options = {amount: 50}){

    let contrast = (options.amount/100) + 1;  //convert to decimal & shift range: [0..2]
    let intercept = 128 * (1 - contrast);

    let r = pixels.get(x,y,0) * contrast + intercept,
        g = pixels.get(x,y,1) * contrast + intercept,
        b =  pixels.get(x,y,2) * contrast + intercept;

    pixel_helper.put(pixels, x,y,
        pixel_helper.clamp_color(r),
        pixel_helper.clamp_color(g),
        pixel_helper.clamp_color(b)
    );
}

module.exports = { init, on_pixel };
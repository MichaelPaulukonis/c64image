const color_helper = require('./color_helper');
const pixel_helper = require('./pixel_helper');

let pixels, pixels_type;

let config = {   
   };

function init( data ){
    pixels = data.pixels;
    pixels_type = data.type;
}

function on_pixel(x,y, options = {scale: 150}){
    
    let dx = options.scale*(1/pixels.shape[0]);
    let dy = options.scale*(1/pixels.shape[1]);
    let nx = Math.floor(dx * Math.floor(x/dx));
    let ny = Math.floor(dy * Math.floor(y/dy));

    pixel_helper.put(pixels, x,y,pixels.get(nx,ny,0),pixels.get(nx,ny,1),pixels.get(nx,ny,2));
}

module.exports = { init, on_pixel };
const color_helper = require('./color_helper');
const pixel_helper = require('./pixel_helper');

let pixels, pixels_type;

let config = {   
    map: [0, 32, 8, 40, 2, 32, 10, 42, 48, 16, 56, 24, 50, 18,58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21]
};

function init( data ){
    pixels = data.pixels;
    pixels_type = data.type;
}

function on_pixel(x,y, options){
    
    let nx = parseInt(x % 8.0);
    let ny = parseInt(y % 8.0);

    let r = find_closest(nx,ny, pixels.get(x,y,0));
    let g = find_closest(nx,ny, pixels.get(x,y,1));
    let b = find_closest(nx,ny, pixels.get(x,y,2));
    
    pixel_helper.put(pixels, x ,y ,r ,g ,b );
    
}

function find_closest(x, y, c){

    let limit = 0;

    if(x<8){
        let index = x + (y*8);
        limit = (config.map[index]+1) * 4; ///64.0;
    }

    if(c < limit){
        return 0;
    }

    return 255;
}

module.exports = { init, on_pixel };
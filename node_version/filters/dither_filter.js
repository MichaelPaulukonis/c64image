const color_helper = require('./color_helper');
const pixel_helper = require('./pixel_helper');

let pixels, pixels_type,
    width, height;

let config = {   
    map: [0, 32, 8, 40, 2, 32, 10, 42, 48, 16, 56, 24, 50, 18,58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21]
};

function init( data ){

    pixels = data.pixels;
    pixels_type = data.type;

    width = pixels.shape[0];
    height = pixels.shape[1];
}

function on_pixel(x,y, options = {name: "bayer"}){
    
    let r,g,b;

    switch(options.name){

        case "bayer8":
            [r,g,b] = bayer8(x,y);
            break;
        
        case "floyd_steinberg":
              [r,g,b] = floyd_steinberg(x,y);
            break;
        
         case "jjn":
              [r,g,b] = jjn(x,y);
            break;
        
         case "atkinson":
              [r,g,b] = atkinson(x,y);
            break;
            
        default:
            console.log("Dither filter error : algo not found");
    }
    
    pixel_helper.put(pixels, x ,y ,r ,g ,b );
}

// Sources
// http://www.tannerhelland.com/4660/dithering-eleven-algorithms-source-code/
// http://www.efg2.com/Lab/Library/ImageProcessing/DHALF.TXT


// --------------------- J A R V I S  J U D I C E  N I N K E ------------------------

function jjn(x,y){

    let r = jjn_channel(x,y,0);
    let g = jjn_channel(x,y,1);
    let b = jjn_channel(x,y,2);

    return [r ,g ,b];
}

function jjn_channel(x,y,channel){

    let cc = pixels.get(x,y,channel);
    let rc = (cc<128)? 0 : 255;
    let err = cc-rc;
    let o48 = 1/48;
    
    diffuse_error(x+1, y,   (err*7)*o48, channel);
    diffuse_error(x+2, y,   (err*5)*o48, channel);

    diffuse_error(x-2, y+1, (err*3)*o48, channel);
    diffuse_error(x-1, y+1, (err*5)*o48, channel);
    diffuse_error(x, y+1,   (err*7)*o48, channel);
    diffuse_error(x+1, y+1, (err*5)*o48, channel);
    diffuse_error(x+2, y+1, (err*3)*o48, channel);

    diffuse_error(x-2, y+2, (err)*o48, channel);
    diffuse_error(x-1, y+2, (err*3)*o48, channel);
    diffuse_error(x, y+2,   (err*5)*o48, channel);
    diffuse_error(x+1, y+2, (err*3)*o48, channel);
    diffuse_error(x+2, y+2, (err)*o48, channel);

    return rc;
}


// --------------------- A T K I N S O N ------------------------

function atkinson(x,y){

    let r = atkinson_channel(x,y,0);
    let g = atkinson_channel(x,y,1);
    let b = atkinson_channel(x,y,2);

    return [r ,g ,b];
}

function atkinson_channel(x,y,channel){

    let cc = pixels.get(x,y,channel);
    let rc = (cc<128)? 0 : 255;
    let err = (cc-rc)>>2;
    
    diffuse_error(x+1, y,   err, channel);
    diffuse_error(x+2, y,   err, channel);
    diffuse_error(x-1, y+1, err, channel);
    diffuse_error(x, y+1,   err, channel);
    diffuse_error(x+1, y+1, err, channel);
    diffuse_error(x, y+2,   err, channel);

    return rc;
}


// --------------------- F L O Y D  S T E I N B E R G ------------------------

// https://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering

function floyd_steinberg(x,y){

    let r = pixel_channel(x,y,0);
    let g = pixel_channel(x,y,1);
    let b = pixel_channel(x,y,2);

    return [r ,g ,b];
}

function pixel_channel(x,y,channel){

    let cc = pixels.get(x,y,channel);       // current color
    let rc = (cc<128)? 0 : 255;             // real (rounded) color
    let err = cc-rc;                   // error amount
    
    diffuse_error(x+1, y,   (err*7)>>4, channel);
    diffuse_error(x-1, y+1, (err*3)>>4, channel);
    diffuse_error(x, y+1,   (err*5)>>4, channel);
    diffuse_error(x+1, y+1, (err*1)>>4, channel);

    return rc;
}

function diffuse_error(x, y, error, channel){

    c = pixel_helper.get(pixels,x,y);
    c[channel] = pixel_helper.clamp_color( c[channel] + error );

    pixel_helper.put(pixels, x ,y ,c[0] ,c[1] ,c[2]);
}


// --------------------- B A Y E R 8 ------------------------

function bayer8(x,y){

    let nx = parseInt(x % 8.0);
    let ny = parseInt(y % 8.0);

    let r = find_closest(nx,ny, pixels.get(x,y,0));
    let g = find_closest(nx,ny, pixels.get(x,y,1));
    let b = find_closest(nx,ny, pixels.get(x,y,2));

    return [r,g,b];
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
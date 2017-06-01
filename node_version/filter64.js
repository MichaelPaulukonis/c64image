
let pixels;
let config = {
    dither: {
        p: [0, 32, 8, 40, 2, 32, 10, 42, 48, 16, 56, 24, 50, 18,58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21]
    }
};

    /*let pixel = {
        r: pixels.get(0,0,0),
        b:  pixels.get(0,0,1),
        g:  pixels.get(0,0,2),
        a:  pixels.get(0,0,3)
    }
    console.log(pixel);*/

function init( data ){
    pixels = data;
}

function get_result(){
    return pixels;
}

function put(x,y,r,g,b){
    pixels.set(x,y,0, r);
    pixels.set(x,y,1, g);
    pixels.set(x,y,2, b);
}


// --------------------- T O   G R A Y ---------------------

function to_gray(x,y){

    let avg = (pixels.get(x,y,0) + pixels.get(x,y,1) + pixels.get(x,y,2)) / 3;
    put(x,y,avg,avg,avg);
}


// --------------------- P I X E L A T E ---------------------

function pixelate_config(scale){

    config.pixelate = {     
        scale: scale
    };
}

function pixelate(x,y){

    let conf = config.pixelate;
    
    let dx = conf.scale*(1/pixels.shape[0]);
    let dy = (conf.scale)*(1/pixels.shape[1]);
    let nx = parseInt(dx * Math.floor(x/dx));
    let ny = parseInt(dy * Math.floor(y/dy));

    put(x,y,pixels.get(nx,ny,0),pixels.get(nx,ny,1),pixels.get(nx,ny,2));
}


// --------------------- D I T H E R ---------------------

function dither_config(scale, grayscale){

    config.dither = {     
        scale: scale,
        grayscale: 0,
        p: [0, 32, 8, 40, 2, 32, 10, 42, 48, 16, 56, 24, 50, 18,58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21]
    };
}

function dither(x,y){

	let nx = parseInt(x % 8.0);
    let ny = parseInt(y % 8.0);

//if(x == 100)    console.log(pixels.get(x,y,0))

    let r = find_closest(nx,ny, pixels.get(x,y,0));
    let g = find_closest(nx,ny, pixels.get(x,y,1));
    let b = find_closest(nx,ny, pixels.get(x,y,2));
    
    put(x ,y ,r ,g ,b );
}

function find_closest(x, y, c){

    let limit = 0;

    if(x<8){
        let index = x + (y*8);
        limit = (config.dither.p[index]+1) * 4; ///64.0;
    }

    if(c < limit){
        return 0;
    }

    return 255;
}


module.exports = { init, get_result, to_gray, pixelate, pixelate_config, dither, dither_config };
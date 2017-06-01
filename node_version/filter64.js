
const color_helper = require('./color_helper');

let pixels;

let config = {
    dither: {
        p: [0, 32, 8, 40, 2, 32, 10, 42, 48, 16, 56, 24, 50, 18,58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21]
    },
    c64palette:{
        colors: [
            [0,0,0], [62,49,162], [87,66,0], [140,62,52],
            [84,84,84], [141,71,179], [144,95,37], [124,112,218],
            [128.0,128.0,129.0],[104.0,169.0,65.0],[187.0,119.0,109.0],[122.0,191.0,199.0],
			[171.0,171.0,171.0],[208.0,220.0,113.0],[172.0,234.0,136.0],[255.0,255.0,255.0]
        ],
        /*lab: [
            [0,0,0], [28.97789348020777, 39.03488183293191, -59.19594490162029]
        ]*/
    }
};

// @todo : gain de perf en stockqnt directement la palette en LAB / http://colormine.org/convert/rgb-to-lab

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
        scale: scale * 15
    };
}

function pixelate(x,y){

    let conf = config.pixelate;
    
    let dx = conf.scale*(1/pixels.shape[0]);
    let dy = conf.scale*(1/pixels.shape[1]);
    let nx = Math.floor(dx * Math.floor(x/dx));
    let ny = Math.floor(dy * Math.floor(y/dy));

    put(x,y,pixels.get(nx,ny,0),pixels.get(nx,ny,1),pixels.get(nx,ny,2));
}


// --------------------- D I T H E R ---------------------

function dither(x,y){

	let nx = parseInt(x % 8.0);
    let ny = parseInt(y % 8.0);

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


// --------------------- C 6 4   P A L E T T E ---------------------

function c64palette(x,y){
    
    let match    = [0,0,0],
        best_dot = 100,
        color    = color_helper.rgb2lab([pixels.get(x,y,0), pixels.get(x,y,1), pixels.get(x,y,2)]);

    for(let c=15; c>0; c--){

        let p = config.c64palette.colors[c],
            this_dot = color_helper.deltaE(color_helper.rgb2lab(p), color);

        if(this_dot < best_dot){
            best_dot = this_dot;
		    match = p;
        }
    }

    put(x,y,match[0], match[1], match[2]);
}


module.exports = { init, get_result, to_gray, pixelate, pixelate_config, dither, c64palette };
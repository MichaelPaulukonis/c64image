
let pixels;
let config = {};

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


module.exports = { init, get_result, to_gray, pixelate, pixelate_config };
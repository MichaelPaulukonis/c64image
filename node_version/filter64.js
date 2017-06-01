
let pixels;


    /*let pixel = {
        r: pixels.get(0,0,0),
        b:  pixels.get(0,0,1),
        g:  pixels.get(0,0,2),
        a:  pixels.get(0,0,3)
    }
    console.log(pixel);*/

function init( data ){
    pixels = data;
    return this;
}

function get_result(){
    return pixels;
}


function to_gray(x,y){

    let avg = (pixels.get(x,y,0) + pixels.get(x,y,1) + pixels.get(x,y,2)) / 3;
    pixels.set(x,y,0, avg);
    pixels.set(x,y,1, avg);
    pixels.set(x,y,2, avg);
}

function pixelate(x,y){

}

module.exports = { init, get_result, to_gray, pixelate };
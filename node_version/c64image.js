
const fs            = require('fs');
const getPixels     = require('get-pixels');
const savePixels    = require('save-pixels');

let pixels;

function toGray(x,y){

    let avg = (pixels.get(x,y,0) + pixels.get(x,y,1) + pixels.get(x,y,2)) / 3;
    pixels.set(x,y,0, avg);
    pixels.set(x,y,1, avg);
    pixels.set(x,y,2, avg);
}

getPixels("assets/portrait.jpg", (err, data) => {

  if(err) {
    console.log("Bad image path")
    return
  }

    pixels = data;

    console.log("got pixels", pixels.shape.slice())

    /*let pixel = {
        r: pixels.get(0,0,0),
        b:  pixels.get(0,0,1),
        g:  pixels.get(0,0,2),
        a:  pixels.get(0,0,3)
    }
    console.log(pixel);*/

    // Get array shape 
    var nx = pixels.shape[0], 
      ny = pixels.shape[1];
 
  //Loop over all cells 
  for(let i=1; i<nx-1; ++i) {
    for(let j=1; j<ny-1; ++j) {
        toGray(i, j);
    }
  }

    var result_file = fs.createWriteStream("out.jpg");
    savePixels(pixels, "jpg").pipe(result_file);
})
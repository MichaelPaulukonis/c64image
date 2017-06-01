
const fs            = require('fs');
const getPixels     = require('get-pixels');
const savePixels    = require('save-pixels');

const filter64 = require('./filter64');

let pixels;


getPixels("assets/88.png", (err, data) => {

  if(err) {
    console.log("Bad image path")
    return
  }

    pixels = data;

    

    console.log("got pixels", pixels.shape.slice())

    // Get array shape 
    const image = {
      width: pixels.shape[0],
      height: pixels.shape[1]
    };

    filter64.init(pixels);
    filter64.pixelate_config(350);
 
  //Loop over all cells 
  for(let i=1; i<image.width-1; ++i) {
    for(let j=1; j<image.height-1; ++j) {
        //filter64.to_gray(i, j);
        
        filter64.pixelate(i, j);
        filter64.dither(i, j);
       
    }
  }

    var result_file = fs.createWriteStream("assets/dither.png");
    savePixels(filter64.get_result(), "png").pipe(result_file);
})
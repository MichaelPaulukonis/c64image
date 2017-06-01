
const fs            = require('fs');
const getPixels     = require('get-pixels');
const savePixels    = require('save-pixels');

const filter64 = require('./filter64');

let pixels;


getPixels("assets/portrait.jpg", (err, data) => {

  if(err) {
    console.log("Bad image path")
    return
  }

    pixels = data;

    filter64.init(pixels);

    console.log("got pixels", pixels.shape.slice())


    // Get array shape 
    var nx = pixels.shape[0], 
      ny = pixels.shape[1];
 
  //Loop over all cells 
  for(let i=1; i<nx-1; ++i) {
    for(let j=1; j<ny-1; ++j) {
        filter64.to_gray(i, j);
    }
  }

    var result_file = fs.createWriteStream("assets/out.jpg");
    savePixels(filter64.get_result(), "jpg").pipe(result_file);
})
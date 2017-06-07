
const fs            = require('fs');
const getPixels     = require('get-pixels');
const savePixels    = require('save-pixels');

const filter64 = require('./filter64');

let pixels,
    file = "assets/portrait.jpg";


getPixels(file, (err, data) => {

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
    filter64.pixelate_config(15);
    filter64.contrast_config(80);

  //Loop over all cells 
  for(let i=1; i<image.width-1; ++i) {
    for(let j=1; j<image.height-1; ++j) {
        //filter64.to_gray(i, j);  
        //filter64.pixelate(i, j);
        //filter64.dither(i, j);
        filter64.c64palette(i, j); 
         //filter64.contrast(i, j);
         filter64.pixelate(i, j);
         //filter64.dither(i, j);   
    }
  }
    let file_type = file.split('.').pop();

    var result_file = fs.createWriteStream("assets/contrast."+file_type);
    savePixels(filter64.get_result(), file_type, {quality: 90}).pipe(result_file);
})
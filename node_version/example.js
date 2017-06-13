
const fs            = require('fs');
const getPixels     = require('get-pixels');
const savePixels    = require('save-pixels');

const filter = require('./filters/filter');
const chrono = require('./chrono');


let pixels,
    file = "assets/sources/portrait.jpg";


getPixels(file, (err, data) => {

  if(err) {
    console.log("Bad image path")
    return
  }

    pixels = data;

    const image = {
      width: pixels.shape[0],
      height: pixels.shape[1]
    };

    console.log("pixels to proceed : ", image.width*image.height, "px");

    filter.init(pixels);

    chrono.start();

    for(let i=1; i<image.width-1; ++i) {
        for(let j=1; j<image.height-1; ++j) {  
            
            //filter.to_gray.on_pixel(i,j);
            //filter.dither.on_pixel(i,j, {name: 'floyd_steinberg'});
            filter.palette.on_pixel(i,j, {name: 'web'});
            //filter.dither.on_pixel(i,j, {name: 'jjn'});
            //filter.contrast.on_pixel(i,j, {amount: 80});
            //filter.to_gray.on_pixel(i,j);
            //filter.pixelate.on_pixel(i,j);
        }
    }

    chrono.stop();

    let file_type = 'png'; //file.split('.').pop();

    var result_file = fs.createWriteStream("assets/filtered."+file_type);
    savePixels(pixels, file_type, {quality: 90}).pipe(result_file);
    
    console.log(`image filtered in ${chrono.get_result()} ms`);
})
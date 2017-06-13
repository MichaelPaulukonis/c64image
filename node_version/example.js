
const fs            = require('fs');
const getPixels     = require('get-pixels');
const savePixels    = require('save-pixels');

const filter = require('./filters/filter');
const chrono = require('./chrono');
const pixel_container = require('./lib/pixel_container');

let file = "assets/sources/portrait.jpg";

getPixels(file, (err, data) => {

  if(err) {
    console.log("Bad image path")
    return
  }

    pixel_container.init(data);

    console.log("pixels to proceed : ", pixel_container.get_width()*pixel_container.get_height(), "px");

    filter.init(pixel_container);

    chrono.start();

    for(let i=1; i<pixel_container.get_width()-1; ++i) {
        for(let j=1; j<pixel_container.get_height()-1; ++j) {  
            
            //filter.to_gray.on_pixel(i,j);
            filter.dither.on_pixel(i,j, {name: 'floyd_steinberg'});
           filter.palette.on_pixel(i,j, {name: 'cga'});
            
            //filter.dither.on_pixel(i,j, {name: 'bayer4'});
            //filter.contrast.on_pixel(i,j, {amount: 100});
           
            //filter.to_gray.on_pixel(i,j);
            //filter.pixelate.on_pixel(i,j);
        }
    }

    chrono.stop();

    let file_type = 'png'; //file.split('.').pop();

    var result_file = fs.createWriteStream("assets/filtered."+file_type);
    savePixels(pixel_container.get_pixels(), file_type, {quality: 90}).pipe(result_file);
    
    console.log(`image filtered in ${chrono.get_result()} ms`);
})
const fs = require("fs");
const getPixels = require("get-pixels");
const savePixels = require("save-pixels");

const filter = require("./filters/filter");
const chrono = require("./chrono");
const pixel_container = require("./lib/pixel_container");

const folder = {
  source: "assets/performance_source/",
  filtered: "assets/performance_filtered/"
};

let id = 0;

console.log(
  "C64image node version performance test",
  "10 images to proceeds ..."
);

function proceed_image() {
  getPixels(`${folder.source}portrait_${id}.jpg`, (err, data) => {
    if (err) {
      console.log("Bad image path");
      return;
    }

    pixel_container.init(data);
    filter.init(pixel_container);

    chrono.start();

    for (let i = 1; i < pixel_container.get_width() - 1; ++i) {
      for (let j = 1; j < pixel_container.get_height() - 1; ++j) {
        switch (id) {
          case 0:
            filter.palette.on_pixel(i, j, { name: "gameboy" });
            filter.pixelate.on_pixel(i, j, { scale: 50 });
            break;

          case 1:
            filter.pixelate.on_pixel(i, j, { scale: 30 });
            filter.palette.on_pixel(i, j, { name: "c64" });
            break;

          case 2:
            filter.grayscale.on_pixel(i, j, { name: "shade" });
            filter.dither.on_pixel(i, j, { name: "jjn" });
            break;

          case 3:
            filter.pixelate.on_pixel(i, j, { scale: 100 });
            break;

          case 4:
            filter.contrast.on_pixel(i, j, { amount: 120 });
            filter.dither.on_pixel(i, j, { name: "atkinson" });
            filter.palette.on_pixel(i, j, { name: "black_white" });
            break;

          case 5:
            filter.palette.on_pixel(i, j, { name: "vic20" });
            filter.pixelate.on_pixel(i, j, { scale: 20 });
            break;

          case 6:
            //filter.contrast.on_pixel(i, j, { amount: 140 });
            filter.dither.on_pixel(i, j, { name: "bayer4" });
            filter.grayscale.on_pixel(i, j, { name: "decomposition_max" });
            break;

          case 7:
            filter.dither.on_pixel(i, j, { name: "floyd_steinberg" });
            filter.palette.on_pixel(i, j, { name: "web" });
            break;

          case 8:
            filter.palette.on_pixel(i, j, { name: "nes" });
            filter.dither.on_pixel(i, j, { name: "bayer8" });
            break;

          case 9:
            filter.palette.on_pixel(i, j, { name: "c64" });
            filter.dither.on_pixel(i, j, { name: "floyd_steinberg" });
            break;
        }
        //filter.to_gray.on_pixel(i,j);
        //filter.dither.on_pixel(i,j, {name: 'floyd_steinberg'});
        //filter.palette.on_pixel(i,j, {name: 'cga'});

        //filter.to_gray.on_pixel(i,j);

        // filter.dither.on_pixel(i,j, {name: 'floyd_steinberg'});
      }
    }

    chrono.stop();

    let file_type = "png"; //file.split('.').pop();

    var result_file = fs.createWriteStream(
      `${folder.filtered}portrait_${id}.jpg`
    );
    savePixels(pixel_container.get_pixels(), file_type, { quality: 90 }).pipe(
      result_file
    );

    console.log(
      `${id} ${pixel_container.get_width() *
        pixel_container.get_height()} pixels filtered in ${chrono.get_result()} ms`
    );

    // loop;
    id++;
    if (id < 10) {
      proceed_image();
    } else {
      console.log(`::: Total time : ${chrono.get_total()} ms`);
    }
  });
}

proceed_image();

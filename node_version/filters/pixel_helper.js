
function put(pixels, x, y, r, g, b){
    pixels.set(x,y,0, r);
    pixels.set(x,y,1, g);
    pixels.set(x,y,2, b);
}

function get(pixels, x,y){

  return [pixels.get(x,y,0),
          pixels.get(x,y,1),
          pixels.get(x,y,2)
        ];
}

function clamp_color(num) {
  return num <= 0 ? 0 : num >= 255 ? 255 : num;
}

module.exports = { put, get, clamp_color };

function put(pixels, x, y, r, g, b){
    pixels.set(x,y,0, r);
    pixels.set(x,y,1, g);
    pixels.set(x,y,2, b);
}

function clamp_color(num) {
  return num <= 0 ? 0 : num >= 255 ? 255 : num;
}

module.exports = { put, clamp_color };
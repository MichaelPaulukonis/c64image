const color_helper =  require('../lib/color_helper');

let pixel_container;

let config = {   
   };

function init( data ){
    pixel_container = data;
}

function on_pixel(x,y, options = {scale: 150}){
    
    let dx = options.scale*(1/pixel_container.get_width());
    let dy = options.scale*(1/pixel_container.get_height());
    let nx = Math.floor(dx * Math.floor(x/dx));
    let ny = Math.floor(dy * Math.floor(y/dy));

    pixel_container.set(x,y,pixel_container.get(nx,ny,0),pixel_container.get(nx,ny,1),pixel_container.get(nx,ny,2));
}

module.exports = { init, on_pixel };
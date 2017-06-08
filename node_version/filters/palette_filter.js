const color_helper = require('./color_helper');
const pixel_helper = require('./pixel_helper');

let pixels, pixels_type;

let config = {
    
    c64: [
            [0,0,0], [62,49,162], [87,66,0], [140,62,52],
            [84,84,84], [141,71,179], [144,95,37], [124,112,218],
            [128.0,128.0,129.0],[104.0,169.0,65.0],[187.0,119.0,109.0],[122.0,191.0,199.0],
			[171.0,171.0,171.0],[208.0,220.0,113.0],[172.0,234.0,136.0],[255.0,255.0,255.0]
        ],
        /*lab: [
            [0,0,0], [28.97789348020777, 39.03488183293191, -59.19594490162029]
        ]*/
        // https://en.wikipedia.org/wiki/List_of_color_palettes
        // https://mrob.com/pub/xapple2/colors.html
    apple2: [
            [0,0,0], [156, 156, 156], [255,255,255], [96, 78, 189],
            [208, 195, 255], [255, 68, 253], [227, 30, 96], [255, 160, 208],
            [255, 106, 60], [96, 114, 3], [208, 221, 141], [20, 245, 60],
            [0, 163, 96], [114, 255, 208],  [20, 207, 253]
        ]
};

// @todo : gain de perf en stockqnt directement la palette en LAB / http://colormine.org/convert/rgb-to-lab


function init( data ){
    pixels = data.pixels;
    pixels_type = data.type;
}

/**
 * 
 * @param {integer} x 
 * @param {integer} y 
 * @param {object} options nam{string} : nom de la palette 
 */
function on_pixel(x,y, options){
    
    let match    = [0,0,0],
        best_dot = 100,
        color    = color_helper.rgb2lab([pixels.get(x,y,0), pixels.get(x,y,1), pixels.get(x,y,2)]),
        palette  = config[options.name];

        if(typeof palette === 'undefined'){
             console.log("Palette filter error : palette name unknown");
        }

    for(let c=palette.length-1 ; c>0; c--){

        let p = palette[c],
            this_dot = color_helper.deltaE(color_helper.rgb2lab(p), color);

        if(this_dot < best_dot){
            best_dot = this_dot;
		    match = p;
        }
    }

    pixel_helper.put(pixels, x,y,match[0], match[1], match[2]);
}

module.exports = { init, on_pixel };
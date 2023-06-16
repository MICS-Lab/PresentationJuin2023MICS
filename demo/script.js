var nb_bixels = 1;
var bounds = [];
var intervals_bounds = [];
var intervals_values = [];
var v_max_per_bixel = 1;
var power = 100;

function get_bounds() {
    if (PTS.length === 0) {
        console.log("No points");
        bounds = [];
    } else {
        bounds = [PTS[0].x, PTS[PTS.length-1].x];
    }
}

function draw_all() {
    clear();
    draw_intensity();
    get_bounds();
    
}
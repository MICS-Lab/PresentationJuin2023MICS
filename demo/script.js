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
function split_to_intervals() {
    if (PTS.length === 0) {
        // console.log("No points");
        intervals_bounds = [];
        intervals_values = [];
        return;
    }
    get_bounds();
    var nb_intervals = Number(range_intervals.value);
    var range = bounds[1] - bounds[0];
    var interval_size = range / nb_intervals;
    var current = bounds[0];
    intervals_bounds = [current];
    intervals_values = [];
    for (var i = 0; i < nb_intervals; i++) {
        var middle = current + interval_size / 2;
        var middle_index = Math.round(middle)-bounds[0];
        var middle_value = PTS[middle_index].y;
        var next = current + interval_size;
        intervals_bounds.push(next);
        intervals_values.push(middle_value);
        current = next;
    }
}

function draw_all() {
    clear();
    draw_intensity();
    get_bounds();
    
}
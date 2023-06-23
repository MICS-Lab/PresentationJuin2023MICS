var nb_bixels = 1;
var intervals_bounds = [];
var intervals_centers = [];
var intervals_heights = [];
var intervals_values = [];
var fluences = [];
var left_leaf_times = [];
var right_leaf_times = [];
var v_max_per_bixel = 1;
var no_solution = false;
var power = 100;

function add_point(x, y) {
    x = Math.round(x);
    x_min = PTS[0].x
    x_max = PTS[PTS.length - 1].x;
    y_begin = PTS[0].y;
    y_end = PTS[PTS.length - 1].y;
    if (x < x_min) {
        for (var xi = x_min - 1; xi >= x; xi--) {
            const yi = y_begin + ((y - y_begin) * (xi - x_min) / (x - x_min));
            PTS.unshift({ x: xi, y: yi });
        }
    } else if (x > x_max) {
        for (var xi = x_max + 1; xi <= x; xi++) {
            const yi = y_end + ((y - y_end) * (xi - x_max) / (x - x_max));
            PTS.push({ x: xi, y: yi });
        }
    }
}
function classic_function(x) {
    PTS = [];
    for (var x = 50; x < WIDTH -50; x++) {
        y = HEIGHT - ((HEIGHT / 3) * Math.sin(x * Math.PI * 2 / WIDTH)) - (x * HEIGHT / WIDTH);
        PTS.push({ x: x, y: y });
    }
}
function typical_fluence(x) {
    PTS = [];
    for (var x = 200; x < WIDTH - 200; x++) {
        y = 50*Math.sin(0.025*(200-x)) + 0.3*x + 100
        PTS.push({ x: x, y: y });
    }
}
function no_pts(){
    PTS = [];
    intervals_bounds = [];
    intervals_centers = [];
    intervals_heights = [];
    intervals_values = [];
    left_leaf_times = [];
    right_leaf_times = [];
}

function split_to_intervals() {
    if (PTS.length === 0) {
        // console.log("No points");
        intervals_bounds = [];
        intervals_values = [];
        return;
    }
    var nb_intervals = Number(range_intervals.value);
    var range = PTS[PTS.length-1].x - PTS[0].x;
    var interval_size = range / nb_intervals;
    var current = PTS[0].x;
    intervals_bounds = [current];
    intervals_heights = [PTS[0].y];
    intervals_values = [];
    intervals_centers = [];
    for (var i = 0; i < nb_intervals; i++) {
        var middle = current + interval_size / 2;
        var middle_index = Math.round(middle)-PTS[0].x;
        var middle_value = PTS[middle_index];
        var next = current + interval_size;
        var end_index = Math.round(next)-PTS[0].x;
        var end_value = PTS[end_index].y;
        intervals_bounds.push(next);
        intervals_heights.push(end_value);
        intervals_values.push(middle_value.y);
        intervals_centers.push(middle_value.x);
        current = next;
    }
}
function calculate_leafs() {
    if (intervals_bounds.length === 0) {
        // console.log("No intervals");
        return;
    }
    try {
        var fluences = [];
        for (var i = 0; i < intervals_values.length; i++) {
            fluences.push(HEIGHT - intervals_values[i]);
        }
        var full_length = (intervals_bounds[intervals_bounds.length - 1] - intervals_bounds[0]);
        var nb_intervals = intervals_bounds.length - 1;
        var max_speed_factor = nb_intervals/(full_length/100);
        leafs = leaf_sequence(fluences, range_power.value, range_max_speed.value*max_speed_factor);
        left_leaf_times = leafs[0];
        right_leaf_times = leafs[1];
        no_solution = false;
    } catch (error) {
        // console.log("No solution");
        left_leaf_times = [-1];
        right_leaf_times = [-1];
        no_solution = true;
    }
}
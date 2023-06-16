var nb_bixels = 1;
var bounds = [];
var intervals_bounds = [];
var intervals_centers = [];
var intervals_heights = [];
var intervals_values = [];
var left_leaf_times = [];
var right_leaf_times = [];
var v_max_per_bixel = 1;
var no_solution = false;
var power = 100;

function get_bounds() {
    if (PTS.length === 0) {
        // console.log("No points");
        bounds = [];
        return;
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
    intervals_heights = [PTS[0].y];
    intervals_values = [];
    intervals_centers = [];
    for (var i = 0; i < nb_intervals; i++) {
        var middle = current + interval_size / 2;
        var middle_index = Math.round(middle)-bounds[0];
        var middle_value = PTS[middle_index];
        var next = current + interval_size;
        var end_index = Math.round(next)-bounds[0];
        var end_value = PTS[end_index].y;
        intervals_bounds.push(next);
        intervals_heights.push(end_value);
        intervals_values.push(middle_value.y);
        intervals_centers.push(middle_value.x);
        current = next;
    }
}
function draw_bixels_fluence_approximation() {
    if (intervals_bounds.length === 0) {
        // console.log("No intervals");
        return;
    }
    CTX.beginPath();
    CTX.strokeStyle = "orange";
    CTX.lineWidth = 2;
    CTX.moveTo(intervals_bounds[0], intervals_values[0]);
    for (var i = 1; i < intervals_values.length; i++) {
        CTX.lineTo(intervals_bounds[i], intervals_values[i-1]);
        CTX.lineTo(intervals_bounds[i], intervals_values[i]);
    }
    CTX.lineTo(intervals_bounds[i], intervals_values[i-1]);
    CTX.stroke();
}
function draw_bixels_intervals() {
    if (intervals_bounds.length === 0) {
        // console.log("No intervals");
        return;
    }
    CTX.beginPath();
    CTX.strokeStyle = "yellow";
    CTX.lineWidth = 1;
    for (var i = 0; i < intervals_heights.length; i++) {
        CTX.moveTo(intervals_bounds[i], HEIGHT);
        CTX.lineTo(intervals_bounds[i], intervals_heights[i]);
    }
    CTX.stroke();
}
function calculate_leafs() {
    if (intervals_bounds.length === 0) {
        // console.log("No intervals");
        return;
    }
    try {
        leafs = leaf_sequence(intervals_values, range_power.value, range_max_speed.value);
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
function draw_effective_intensity() {
    if (left_leaf_times.length === 0) {
        // console.log("No leafs");
        return;
    }
    CTX.beginPath();
    CTX.strokeStyle = "red";
    CTX.lineWidth = 5;
    CTX.moveTo(intervals_centers[0], (left_leaf_times[0]-right_leaf_times[0])*range_power.value);
    for (var i = 1; i < left_leaf_times.length; i++) {
        CTX.lineTo(intervals_centers[i], (left_leaf_times[i]-right_leaf_times[i])*range_power.value);
    }
    CTX.stroke();
}
function draw_leafs() {
    if (left_leaf_times.length === 0) {
        // console.log("No leafs");
        return;
    }
    if(no_solution) {
        CTX2.beginPath();
        CTX2.fillStyle = "red";
        CTX2.fillStyle = "#ffcccb";
        CTX2.rect(0, 0, jaws.width, jaws.height);
        CTX2.fill();
    }
    const TIME_SCALE = 100;
    const TIME_0 = 2;
    CTX2.beginPath();
    CTX2.strokeStyle = "green";
    CTX2.lineWidth = 2;
    CTX2.moveTo(intervals_centers[0], left_leaf_times[0]*TIME_SCALE + TIME_0);
    for (var i = 1; i < left_leaf_times.length; i++) {
        CTX2.lineTo(intervals_centers[i], left_leaf_times[i]*TIME_SCALE + TIME_0);
    }
    CTX2.stroke();
    CTX2.beginPath();
    CTX2.strokeStyle = "blue";
    CTX2.lineWidth = 2;
    CTX2.moveTo(intervals_centers[0], right_leaf_times[0]*TIME_SCALE + TIME_0);
    for (var i = 1; i < right_leaf_times.length; i++) {
        CTX2.lineTo(intervals_centers[i], right_leaf_times[i]*TIME_SCALE + TIME_0);
    }
    CTX2.stroke();
}

function draw_all() {
    if (PTS.length === 0) {
        // console.log("No points");
        return;
    } else {
        clear();
        draw_intensity();
        split_to_intervals();
        draw_bixels_intervals();
        draw_bixels_fluence_approximation();
        calculate_leafs();
        draw_leafs();
        draw_effective_intensity();
    }
}
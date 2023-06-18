function clear() {
    CTX.clearRect(0, 0, intensity.width, intensity.height);
    CTX2.clearRect(0, 0, jaws.width, jaws.height);
}

function draw_intensity() {
    CTX.beginPath();
    CTX.strokeStyle = "black";
    CTX.lineWidth = 5;
    if (PTS.length !== 0) {
        CTX.moveTo(PTS[0].x, PTS[0].y);
        PTS.slice(1).forEach(function (point) {
            CTX.lineTo(point.x, point.y);
        });
        CTX.stroke();
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
    clear();
    draw_intensity();
    split_to_intervals();
    if(draw_intervals_checkbox.checked){
        draw_bixels_intervals();
    }
    if(draw_discretization_checkbox.checked){
        draw_bixels_fluence_approximation();
    }
    calculate_leafs();
    draw_leafs();
    if(draw_effective_intensity_checkbox.checked){
        draw_effective_intensity();
    }
}
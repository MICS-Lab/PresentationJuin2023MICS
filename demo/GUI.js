var CTX = intensity.getContext('2d');
var CTX2 = jaws.getContext('2d');
var PTS = [];
var DOWN = false;
const WIDTH = intensity.width;
const HEIGHT = intensity.height;

// user interaction
intensity.addEventListener('pointerup', function (e) {
    var rect = intensity.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    DOWN = false;
    if(PTS.length === 1) {
        PTS.push({ x: Math.round(x)+1, y: y });
    }
    add_point(x, y);
    draw_all();
});
intensity.addEventListener('pointerleave', function (e) {
    if (DOWN) {
        var rect = intensity.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        add_point(Math.max(0, Math.min(x, WIDTH)), Math.max(0, Math.min(y, HEIGHT)));
        draw_all();
    }
    DOWN = false;
});
intensity.addEventListener('pointerenter', function (e) {
    if (e.buttons != 0) {
        var rect = intensity.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        if (PTS.length === 0) {
            PTS.push({ x: Math.round(x), y: y });
        } else {
            add_point(Math.max(0, Math.min(x, WIDTH)), Math.max(0, Math.min(y, HEIGHT)));
        }
        DOWN = true;
        draw_intensity();
    }
});
intensity.addEventListener('pointerdown', function (e) {
    var rect = intensity.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    DOWN = true;
    PTS = [{ x: Math.round(x), y: y }];
    BOXES = [];
    clear();
    draw_intensity();
});
intensity.addEventListener('pointermove', function (e) {
    if (DOWN) {
        var rect = intensity.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        add_point(x, y);
        draw_intensity();
    }
});

range_intervals_value.innerHTML = range_intervals.value;
range_max_speed_value.innerHTML = range_max_speed.value;
range_power_value.innerHTML = range_power.value;
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
typical_fluence();
draw_all();

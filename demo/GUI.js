var CTX = intensity.getContext('2d');
var PTS = [];
var DOWN = false;
const WIDTH = intensity.width;
const HEIGHT = intensity.height;


function clear() {
    CTX.clearRect(0, 0, intensity.width, intensity.height);
}

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
function draw_intensity() {
    CTX.beginPath();
    CTX.strokeStyle = "black";
    CTX.lineWidth = 5;
    if (PTS.length !== 0) {
        CTX.moveTo(PTS[0].x, PTS[0].y);
        PTS.slice(1).forEach(function (point) {
            CTX.lineTo(point.x, point.y);
        });
    }
    CTX.stroke();
}


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
    draw_intensity();
});
intensity.addEventListener('pointerleave', function (e) {
    if (DOWN) {
        var rect = intensity.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        add_point(Math.max(0, Math.min(x, WIDTH)), Math.max(0, Math.min(y, HEIGHT)));
        draw_intensity();
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

clear_btn.addEventListener('click', function (e) {
    PTS = [];
    clear();
});

range_intervals_value.innerHTML = range_intervals.value;
range_power_value.innerHTML = range_power.value;
function typical_function(x) {
    PTS = [];
    for (var x = 50; x < WIDTH -50; x++) {
        y = HEIGHT - ((HEIGHT / 3) * Math.sin(x * Math.PI * 2 / WIDTH)) - (x * HEIGHT / WIDTH);
        PTS.push({ x: x, y: y });
    }
}
typical_function();
draw_intensity();
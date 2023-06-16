var ctx = intensity.getContext('2d');
var PTS = [];
var DOWN = false;
const WIDTH = intensity.width;
const HEIGHT = intensity.height;


function clear() {
    ctx.clearRect(0, 0, intensity.width, intensity.height);
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
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    if (PTS.length !== 0) {
        ctx.moveTo(PTS[0].x, PTS[0].y);
        PTS.slice(1).forEach(function (point) {
            ctx.lineTo(point.x, point.y);
        });
    }
    ctx.stroke();
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
    }
    DOWN = false;
    draw_intensity();
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

// setup
var f = [1, 2, 3, 2, 1,0];
var p = 3;
var v_max = 2;
var x_size = f.length;
var nb_var = x_size * 2;
var A = [];
var b = [];

// cost function
var c = new Array(nb_var).fill(1);

// equality constraints
for (var i = 0; i < x_size; i++) {
    var row = new Array(nb_var).fill(0);
    row[i] = 1;
    row[i + x_size] = -1;
    A.push(row);
    b.push(f[i]/p+0.00001);
    var row = new Array(nb_var).fill(0);
    row[i] = -1;
    row[i + x_size] = 1;
    A.push(row);
    b.push(-f[i]/p);
}

// positive time constraints
for (var i = 0; i < nb_var; i++) {
    var row = new Array(nb_var).fill(0);
    row[i] = -1;
    A.push(row);
    b.push(0);
}

// max velocity constraints
for (var i = 0; i < x_size-1; i++) {
    // left leafs
    var row = new Array(nb_var).fill(0);
    row[i] = 1;
    row[i + 1] = -1;
    A.push(row);
    b.push(v_max);
    // right leafs
    var row = new Array(nb_var).fill(0);
    row[x_size + i] = 1;
    row[x_size + i + 1] = -1;
    A.push(row);
    b.push(v_max);
}

var lp=numeric.solveLP(c, A, b);

var solution=numeric.trunc(lp.solution,1e-12);

console.log(solution);

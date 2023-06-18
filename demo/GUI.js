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

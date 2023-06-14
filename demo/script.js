var PTS = [];

function clear() {
    if (!EXPORT) {
        ctx.clearRect(0, 0, intensity.width, intensity.height);
    }
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

var CTX = intensity.getContext('2d');
var CTX2 = jaws.getContext('2d');
var PTS = [];
var DOWN = false;
const WIDTH = intensity.width;
const HEIGHT = intensity.height;

function addListenerMulti(element, eventNames, listener) {
    var events = eventNames.split(' ');
    for (var i=0, iLen=events.length; i<iLen; i++) {
      element.addEventListener(events[i], listener, false);
    }
  }

// user interaction
addListenerMulti(intensity, 'pointerup mouseup touchend', function (e) {
// intensity.addEventListener('pointerup mouseup touchend', function (e) {
    var rect = intensity.getBoundingClientRect();
    DOWN = false;
    if(PTS.length === 1) {
        PTS.push({ x: PTS[0].x, y:  PTS[0].y });
    }
    draw_all();
});

//// this part miss behave on cell phone so just ignore atm
// addListenerMulti(intensity, 'pointerleave mouseleave', function (e) {
// // intensity.addEventListener('pointerleave mouseleave', function (e) {
//     if (DOWN) {
//         var rect = intensity.getBoundingClientRect();if(e.clientX === undefined){
//             var x = e.touches[0].clientX - rect.left;
//             var y = e.touches[0].clientY - rect.top;
//         }else{
//             var x = e.clientX - rect.left;
//             var y = e.clientY - rect.top;
//         }
//         add_point(Math.max(0, Math.min(x, WIDTH)), Math.max(0, Math.min(y, HEIGHT)));
//         draw_all();
//     }
//     DOWN = false;
// });
// addListenerMulti(intensity, 'pointerenter mouseenter', function (e) {
// // intensity.addEventListener('pointerenter mouseenter', function (e) {
//     if (e.buttons != 0) {
//         var rect = intensity.getBoundingClientRect();
//         if(e.clientX === undefined){
//             var x = e.touches[0].clientX - rect.left;
//             var y = e.touches[0].clientY - rect.top;
//         }else{
//             var x = e.clientX - rect.left;
//             var y = e.clientY - rect.top;
//         }
//         if (PTS.length === 0) {
//             PTS.push({ x: Math.round(x), y: y });
//         } else {
//             add_point(Math.max(0, Math.min(x, WIDTH)), Math.max(0, Math.min(y, HEIGHT)));
//         }
//         DOWN = true;
//         draw_intensity();
//     }
// });
addListenerMulti(intensity, 'pointerdown mousedown touchstart', function (e) {
// intensity.addEventListener('pointerdown mousedown touchstart', function (e) {
    var rect = intensity.getBoundingClientRect();
    if(e.clientX === undefined){
        var x = e.touches[0].clientX - rect.left;
        var y = e.touches[0].clientY - rect.top;
    }else{
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
    }
    DOWN = true;
    PTS = [{ x: Math.round(x), y: y }];
    BOXES = [];
    clear();
    draw_intensity();
});
addListenerMulti(intensity, 'pointermove mousemove touchmove', function (e) {
// intensity.addEventListener('pointermove mousemove touchmove', function (e) {
    if (DOWN) {
        var rect = intensity.getBoundingClientRect();
        if(e.clientX === undefined){
            var x = e.touches[0].clientX - rect.left;
            var y = e.touches[0].clientY - rect.top;
        }else{
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
        }
        add_point(x, y);
        draw_intensity();
    }
});

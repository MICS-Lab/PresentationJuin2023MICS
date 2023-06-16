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
// no backward constraints
for (var i = 0; i < x_size-1; i++) {
    // left leafs
    var row = new Array(nb_var).fill(0);
    row[i] = -1;
    row[i + 1] = 1;
    A.push(row);
    b.push(0);
    // right leafs
    var row = new Array(nb_var).fill(0);
    row[x_size + i] = -1;
    row[x_size + i + 1] = 1;
    A.push(row);
    b.push(0);
}

var lp = numeric.solveLP(c, A, b);
var solution = numeric.trunc(lp.solution,1e-12);
left_leaf_time = solution.slice(0, x_size);
right_leaf_time = solution.slice(x_size, nb_var);

console.log(left_leaf_time);
console.log(right_leaf_time);

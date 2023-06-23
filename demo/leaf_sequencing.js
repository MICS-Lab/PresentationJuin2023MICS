function leaf_sequence(fluence, power, max_speed) {
  // setup
  var x_size = fluence.length;
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
    b.push(fluence[i] / power + 0.00001);
    var row = new Array(nb_var).fill(0);
    row[i] = -1;
    row[i + x_size] = 1;
    A.push(row);
    b.push(-fluence[i] / power);
  }

  // positive time constraints
  for (var i = 0; i < nb_var; i++) {
    var row = new Array(nb_var).fill(0);
    row[i] = -1;
    A.push(row);
    b.push(0);
  }

  // max velocity constraints
  for (var i = 0; i < x_size - 1; i++) {
    // left leafs
    var row = new Array(nb_var).fill(0);
    row[i] = -1;
    row[i + 1] = 1;
    A.push(row);
    b.push(-1 / max_speed);
    // right leafs
    var row = new Array(nb_var).fill(0);
    row[x_size + i] = -1;
    row[x_size + i + 1] = 1;
    A.push(row);
    b.push(-1 / max_speed);
  }
  // no backward constraints
  for (var i = 0; i < x_size - 1; i++) {
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
  var solution = numeric.trunc(lp.solution, 1e-12);
  left_leaf_times = solution.slice(0, x_size);
  right_leaf_times = solution.slice(x_size, nb_var);
  return [left_leaf_times, right_leaf_times];
}

// // test setup
// var f = [1, 2, 3, 2, 1,0];
// var p = 3;
// var s_max = 2;
// var leafs = leaf_sequence(f, p, s_max);
// var left_leaf_times = leafs[0];
// var right_leaf_times = leafs[1];
// console.log(left_leaf_times);
// console.log(right_leaf_times);

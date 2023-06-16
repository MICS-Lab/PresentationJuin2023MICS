# LP Solver Used
## JS Module
=> **numeric** (full JS linear programming solver)

GitHub: https://github.com/sloisel/numeric/

Tutorial: https://advancedweb.hu/running-lp-optimisation-from-javascript/

The module is available locally for legacy purposes; I minified it for fast loading.

One could also use a 
CDN: https://cdnjs.cloudflare.com/ajax/libs/numeric/1.2.6/numeric.js

(add `<script src="https://cdnjs.cloudflare.com/ajax/libs/numeric/1.2.6/numeric.js"></script>`)

## Equality Constraints Tricks
*'numeric'* (the JS LP solver) does ***NOT*** handle equality constraints, only inequality constraints.

Thus, I have turned every equality constraint into two inequality constraints ($a = b$ becomes $a \leq b$ and $b \leq a$).

This method is subject to numerical errors, so I also added a small positive $\varepsilon$ to make the solver converge (so $a = b$ in fact becomes $a \leq b$ and $b \leq a + \varepsilon$).

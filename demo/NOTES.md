# LP Solver Used
## JS Module
=> **numeric** (full JS linear programming solver)

GitHub: https://github.com/sloisel/numeric/

Tutorial: https://advancedweb.hu/running-lp-optimisation-from-javascript/

CDN: https://cdnjs.cloudflare.com/ajax/libs/numeric/1.2.6/numeric.js

(add `<script src="https://cdnjs.cloudflare.com/ajax/libs/numeric/1.2.6/numeric.js"></script>`)

## Equality Constraints Trick
*'numeric'* (the JS LP solver) does ***NOT*** handle equality constraints, only inequality constraints.

Thus, I have turned every equality constraint into two inequality constraints ($a = b$ becomes $a \leq b$ and $b \leq a$).

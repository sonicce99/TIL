## Link ()      

- https://www.acmicpc.net/problem/9663  

## 내 풀이 ()           

```javascript
const getCombination = (x, y, N, array, sum, deps) => {
  if(deps === N) {
    return sum + 1;
  }

  const a = array.map((inner, col) => {
    return inner.map((el, row) => {
      if(row === x || col === y || Math.abs(row - x) === Math.abs(col - y)) {

        if(row === x && col === y) {
          return true;
        }
        return false;
      }

      return el;
    })
  })

  console.log(a)

  const isNextPositionExist = a[y + 1].filter(el => el === true).length;

  if(isNextPositionExist) {
    for(let w=0; w<N; w++) {
      if(a[y + 1][w]) {
        sum += getCombination(w, y + 1, N, a, sum, deps + 1);
      }
    }
  }

  else {
    return 0;
  }


}

const solution = (N) => {
  let result = 0;

  for(let x=0; x<N; x++) {
    let sum = 0;
    const array = new Array(N).fill(null).map(el => new Array(N).fill(true));

    const value = getCombination(x, 0, N, array, sum, 1);
    result += value;
  }

  return result;
}


const N = require('fs').readFileSync('index.txt').toString();

console.log(solution(Number(N)));
```

## Link ()      

- https://www.acmicpc.net/problem/9663  

## 내 풀이 ()           

```javascript
const getCombination = (X, Y , array) => {
  array.map((el, row) => {
    if(row === X) {

    }
  })
}

const solution = (N) => {
  let sum = 0;
  for(let i=1; i<=N; i++) {

    for(let j=1; j<=N; j++) {

      const array = new Array(N + 1).fill(null).map(el => new Array(N + 1));
      const value = getCombination(i, j, array);
      sum += value;
    }
  }

  return sum;
}


const N = require('fs').readFileSync('index.txt').toString();;

console.log(solution(Number(N)));
```

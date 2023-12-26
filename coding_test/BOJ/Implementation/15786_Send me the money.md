## Link (브론즈 1)  

- https://www.acmicpc.net/problem/15786  

## 내 풀이 (10676KB, 192ms)

```js
const [T, S, ...array] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = T.split(' ').map(Number);
const answer = [];

for(let i=0; i<M; i++) {

  const s = array[i];

  let count = 0;
  for(let j=0; j<s.length; j++) {

    if(s[j] === S[count]) {
      count++;

      if(count === S.length) {
        answer.push(true);
        break;
      }

    }
  }

  if(count < S.length) {
    answer.push(false);
  }
}

console.log(answer.join('\n'))
```

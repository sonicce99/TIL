## Link (브론즈 2)      

- https://www.acmicpc.net/problem/15829  


## 내 풀이 (9332KB, 128ms)  

```js
const solution = (L, string) => {
  let sum = 0n;
  let num = 1n

  for(let i=0; i<L; i++) {
    sum += BigInt(string[i].charCodeAt(0) - 96) * num;
    num *= 31n;
  }

  return String(sum % 1234567891n).replace(/n/, '')
}

const [L, string] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(solution(Number(L), string));
```

L이 50일 때 그냥 31**50 하면 숫자가 너무커서 제대로 계산이 안된다.

그래서 BigInt형으로 따로 계속 게산을 해주며 sum을 구해야한다.

## Link (실버 4)        

- https://www.acmicpc.net/problem/10211  

## 첫번째 내 풀이 (10436KB, 228ms)           

```javascript
const solution = (n , array) => {
    let max = -Infinity;

    for(let i=0; i<n; i++) {

        let sum = 0;

        for(let j=i; j<n; j++) {
            sum += array[j];
            max = Math.max(max, sum)
        }
    }

    return max
}

const [T, ...rest] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');


for(let i=0; i<Number(T); i++) {
    console.log(solution(Number(rest[i * 2]), rest[(i * 2) + 1].split(' ').map(Number)));   
}
```

n의 범위가 (1 ≤ N ≤ 1,000) 이기 때문에 완전탐색으로 충분히 가능했다.

하지만 DP로도 풀 수 있어, DP로도 풀어보았다.

## 두번째 내 풀이 (10808KB, 184ms)

```js
const solution = (n , array) => {
    const dp = new Array(n).fill(0);
    dp[0] = array[0];

    for(let i=1; i<n; i++) {
        dp[i] = Math.max(dp[i - 1] + array[i], array[i]);
    }

    return Math.max(...dp)
}

const [T, ...rest] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');


for(let i=0; i<Number(T); i++) {
    console.log(solution(Number(rest[i * 2]), rest[(i * 2) + 1].split(' ').map(Number)));   
}
```


DP를 통해 2중 for문으로 풀었던 것을, 반복문 한번으로 끝낼 수 있었다. 

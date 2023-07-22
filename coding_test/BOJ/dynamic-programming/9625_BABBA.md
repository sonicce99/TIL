## Link (실버 5)        

- https://www.acmicpc.net/problem/9625  


## 내 풀이 (9320KB, 120ms)  

```javascript
const K = Number(require('fs').readFileSync('/dev/stdin').toString().trim());

const dp = Array.from(new Array(K + 1), x => [1, 0]);

if(K === 1) console.log('0 1');
else {
    dp[1][0] = 0;
    dp[1][1] = 1;

    for(let i=2; i<=K; i++) {
        dp[i][0] = dp[i - 1][0] + dp[i - 2][0];
        dp[i][1] = dp[i - 1][1] + dp[i - 2][1];
    }
    console.log(dp[K].join(' '))
}
```

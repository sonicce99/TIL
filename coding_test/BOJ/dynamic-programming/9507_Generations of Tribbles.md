## Link (실버 4)   

- https://www.acmicpc.net/problem/9507  


## 내 풀이 (9692KB, 160ms)  

```javascript
const [t, ...rest] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')

const array = rest.map(Number);

for(let i=0; i<Number(t); i++) {
    const n = array[i];

    if(n < 2) console.log(1);
    else if(n === 2) console.log(2);
    else if(n === 3) console.log(4);
    else {
        const dp = new Array(n + 1);
        dp[0] = dp[1] = 1n;
        dp[2] = 2n;
        dp[3] = 4n;

        for(let j=4; j<=n; j++) {
            dp[j] = dp[j - 1] + dp[j - 2] + dp[j - 3] + dp[j - 4];
        }

        console.log(dp[n].toString());
    }
}
```

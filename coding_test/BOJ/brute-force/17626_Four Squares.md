## Link (실버 3)      

- https://www.acmicpc.net/problem/17626  

## 첫번째 내 풀이 (시간초과)    

```javascript
const solution = (n) => {
    let answer = Infinity;

    const recur = (depth, num) => {
        if(num === 0) {
            answer = Math.min(answer, depth);
            return;
        }

        else if(depth > 4) return

        const intSqrt = Math.floor(Math.sqrt(num));

        for(let i=intSqrt; i>0; i--) {
            const left = num - i**2;

            recur(depth + 1, left);
        }   
    }

    recur(1, n);

    return answer - 1
};

const n = require('fs').readFileSync('/dev/stdin').toString().trim();


console.log(solution(Number(n)));
```

이 문제를 recursive 하게 접근하기엔 depth가 너무 많다...

시간 제한이 0.5초인데 추가 시간이 없다. 분명히 그냥 recursive하게 푼다면 시간초과가 날 확률이 높다는걸 인지했어야한다.


## 두번째 풀이 (11280KB, 236ms)   

```js
const solution = (n) => {
    const dp = new Array(n + 1).fill(Infinity);

    dp[0] = 0;
    dp[1] = 1;

    for(let i=2; i<=n; i++) {
        const sqrt = Math.sqrt(i);
        const intSqrt = Math.floor(sqrt);

        for(let j=intSqrt; j>0; j--) {
            const left = i - j**2
            dp[i] = Math.min(dp[i], 1 + dp[left]);
        }
    }

    return dp[n]
};

const n = require('fs').readFileSync('/dev/stdin').toString().trim();


console.log(solution(Number(n)));
```

이 문제를 DP로 풀 수 있겠다는 생각을 처음에 하지를 못했다.

브루트포스로 접근해야겠다고 생각은 했었는데 앞으로 브루트포스로 접근이 가능하고, 최솟값, 최댓값을 찾으라고 하는 문제에 대해서는 dp를 고려해보아야겠다. 

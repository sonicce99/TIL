## Link (실버 3)      

- https://www.acmicpc.net/problem/17626  

## 첫번째 내 풀이 (틀렸습니다)  

```javascript
const solution = (n) => {
    let answer = Infinity;

    const recur = (depth, num) => {
        if(depth > 5) return;

        else if(num === 0) {
            answer = Math.min(answer, depth - 1);
            return;
        }

        const sqrt = Math.floor(Math.sqrt(num));

        for(let i=sqrt; i>0; i--) {
            const left = num - i**2;

            recur(depth + 1, left);
        }        
    }

    recur(1, n);

    return answer;
}

const n = require('fs').readFileSync('/dev/stdin').toString().trim();


console.log(solution(Number(n)));
```

## Link (골드 5)          

- https://www.acmicpc.net/problem/1013  


## 내 풀이 (9552KB, 120ms)    

```js
const solution = (N, array) => {
    const regExp = new RegExp(/^(100+1+|01)+$/)

    const answer = array.map(str => {
        if(regExp.test(str)) {
            return 'YES'
        }

        return 'NO'
    }).join('\n')

    return answer
}

const [T, ...array] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(solution(Number(T), array));
```

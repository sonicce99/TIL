## Link (실버 1)        

- https://www.acmicpc.net/problem/5525  


## 내 풀이 (50점, 9500KB, 120ms)

```js
const solution = (N, M, S) => {
    let answer = 0;
    let target = ''

    for(let t=0; t<N; t++) {
        target += 'IO'
    }
    target += 'I';

    for(let i=0; i<M; i++) {
        if(S[i] === 'I') {
            const sliced = S.slice(i, i + (N * 2 + 1));

            if(sliced === target) {
                answer++;
            }
        }
    }

    return answer;
}

const [N, M, S] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(solution(Number(N), Number(M), S));
```

N이 최대 100만이고, M이 최대 50만이다. 시간 복잡도가 N * M 이므로 시간제한 1초를 훨씬 초과하게 된다.

따라서 이렇게 단순 풀이로는 통과할 수가 없고 kmp 알고리즘을 사용해야한다.


```js
const makeLPS = (pattern) => {
    let patternIndex = 0;
    const array = new Array(pattern.length).fill(0);

    for(let i=1; i<pattern.length; i++) {
        while(patternIndex > 0 && pattern[i] !== pattern[patternIndex]) {
            patternIndex = array[patternIndex - 1];
        }

        if(pattern[i] === pattern[patternIndex]) {
            array[i] = ++patternIndex;
        }
    }

    return array;
}

const solution = (string, pattern) => {
    const lps = makeLPS(pattern);

    let patternIndex = 0;
    let answer = 0;

    for(let i=0; i<string.length; i++) {
        while(patternIndex > 0 && string[i] !== pattern[patternIndex]) {
            patternIndex = lps[patternIndex - 1];
        }

        if(string[i] === pattern[patternIndex]) {

            if(pattern.length - 1 === patternIndex) {
                answer++;
                patternIndex = lps[patternIndex];

            }

            else {
                patternIndex++;
            }
        }
    }

    return answer;
}

const [n, m, string] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const pattern = 'IO'.repeat(n) + 'I';

console.log(solution(string, pattern));
```

어렵다...

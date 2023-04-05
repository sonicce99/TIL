- 참고 링크 : https://bowbowbow.tistory.com/6  

- 백준 : https://www.acmicpc.net/problem/5525

```javascript
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

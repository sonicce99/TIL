- 참고 링크 : https://bowbowbow.tistory.com/6  

- 백준 : https://www.acmicpc.net/problem/5525

```javascript
const makeLps = (pattern) => {
    const array = new Array(pattern.length).fill(0);
    let patternIdx = 0;

    for(let i=1; i<pattern.length; i++) {
        if(pattern[i] === pattern[patternIdx]) {
            array[i] = ++patternIdx;
        }
        else {
            patternIdx = 0;
        }
    }

    return array
}

const solution = (string, pattern) => {
    let patternIndex = 0;
    let answer = 0;
    const lps = makeLps(pattern);

    for(let i=0; i<string.length; i++) {
        while(patternIndex > 0 && string[i] !== pattern[patternIndex]) {
            patternIndex = lps[patternIndex  - 1];
        }

        if (string[i] === pattern[patternIndex]) {

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
```

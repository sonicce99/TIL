## Link       

- https://www.hackerrank.com/challenges/staircase/problem?isFullScreen=true


## 내 풀이

```js
function staircase(n) {
    const answer = [];
    for(let i=1; i<=n; i++) {
        let string = ``;
        let spaceN = n - i;

        for(let j=0; j<spaceN; j++) {
            string += ` `;
        }

        for(let t=0; t<i; t++) {
            string += `#`;
        }

        answer.push(string);
    }

    return answer.join('\n');
}
```

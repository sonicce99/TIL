## Link       

- https://www.hackerrank.com/challenges/migratory-birds/problem?isFullScreen=true&h_r=next-challenge&h_v=zen  


## 내 풀이

```js
function migratoryBirds(arr) {
    const answer = [];
    const map = new Map();

    arr.forEach(num => {
        if(map.has(num)) {
            const val = map.get(num);
            map.set(num, val + 1);
        }

        else {
            map.set(num, 1);
        }
    });

    const max = Math.max(...map.values());
    for(let key of map.keys()) {
        if(map.get(key) === max) {
            answer.push(key);
        }
    }

    return answer.sort()[0]
}
```

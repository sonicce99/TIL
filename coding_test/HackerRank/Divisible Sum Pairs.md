## Link       

- https://www.hackerrank.com/challenges/divisible-sum-pairs/problem?isFullScreen=true


## 내 풀이

```js
function divisibleSumPairs(n, k, ar) {
    let answer = 0;
    for(let i=0; i<n - 1; i++) {
        for(let j=i+1; j<n; j++) {
            const sum = ar[i] + ar[j];

            if(sum % k === 0) {
                answer++;
            }
        }
    }

    return answer;
}
```

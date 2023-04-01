## Link       

- https://www.hackerrank.com/challenges/diagonal-difference/problem?isFullScreen=true


## 내 풀이

```js
function diagonalDifference(n, arr) {
    let sum = 0;
    for(let i=0; i<n; i++) {
        sum += arr[i][i] - arr[i][n - (i + 1)];
    }

    return Math.abs(sum)
}
```

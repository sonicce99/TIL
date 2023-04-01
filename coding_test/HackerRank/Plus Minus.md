## Link       

- https://www.hackerrank.com/challenges/plus-minus/problem?isFullScreen=true


## 내 풀이

```js
function plusMinus(n, arr) {
    let positive = 0;
    let negative = 0;
    let zero = 0;

    for(let i=0; i<n; i++) {
        if(arr[i] > 0) {
            positive++;
        }

        else if (arr[i] < 0) {
            negative++;
        }

        else {
            zero++;
        }
    }

    return [(positive / n).toFixed(6), (negative / n).toFixed(6), (zero / n).toFixed(6)]
}
```

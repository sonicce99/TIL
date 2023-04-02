## Link       

- https://www.hackerrank.com/challenges/sock-merchant/problem?isFullScreen=true&h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen  


## 내 풀이

```js
function sockMerchant(n, ar) {
    let answer = 0;
    const map = new Map();

    ar.forEach(el => {
        if(map.has(el)) {
            const val = map.get(el);
            map.set(el, val + 1);
        }

        else {
            map.set(el, 1);
        }
    })

    for(const value of map.values()) {
        answer += parseInt(value / 2);
    }

    return answer
}
```

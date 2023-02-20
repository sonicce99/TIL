# 순열과 조합


### 조합

```javascript
const arr = [1,2,3,4,5];
const M = 2;
const answer = [];

const combination = (depth, index, temp) => {
  if(depth === M) {
    answer.push([...temp]);
  }

  else {
    for(let i=index; i<arr.length; i++) {
      temp[depth] = arr[i];
      combination(depth + 1, i + 1, temp);
    }
  }
}

combination(0, 0, []);

console.log(answer)
```




### 순열

```javascript
  function Permutations(arr, num) {
    const results = [];

    if (num === 1) {
      return arr.map((t) => [t]);
    }

    arr.map((fixed, index, origin) => {
      const rest = [...origin.slice(0, index), ...origin.slice(index+1)]
      const permutations = Permutations(rest, num - 1);
      const attached = permutations.map((t) => [fixed, ...t]);
      results.push(...attached);
    });

    return results;
  };
```  



다른점 : rest를 저장하는 방식이 서로 다르다. 조합 같은 경우에는 fixed된 값의 다음 값들을 slice했지만 순열 같은 경우에는 더 slice 해야된다.


느낀점: 재귀함수가 아직 너무 어렵다. 직관적으로 코드를 완벽히 이해하려면 아직 한참 멀은 것 같다...
보다보면 알게 되겠지...


출처 : https://jun-choi-4928.medium.com/javascript%EB%A1%9C-%EC%88%9C%EC%97%B4%EA%B3%BC-%EC%A1%B0%ED%95%A9-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-21df4b536349

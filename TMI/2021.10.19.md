# 알고리즘 성능 표기법


- Big O (빅-오) 표기법: O(N)

  1. 알고리즘 최악의 실행 시간을 표기

  2. 가장 많이/ 일반적으로 사용함

  3. 아무리 최악의 상황이라도, 이 정도의 성능은 보장한다는 의미



- Ω (오메가) 표기법: Ω(N)

  - 알고리즘 최상의 실행 시간을 표기




- θ (세타) 표기법: θ(N)

  - 세타 표기법은 알고리즘 평균 실행 시간을 표기  



***

### 빅-오 표기법  

O(1) < O(logn) < O(n) < O(nlogn) < O(n^2) < O(2^n) < O(n!) 등으로 표기   

 1. 왼쪽으로 갈 수록 성능이 좋음

 2. log의 밑은 10이 아니라 2



##### O(1) : 무조건 상수회 실행한다. 2번 or 3번 ... 10000번

```javascript
  if(n>10) print(n)
```


##### O(n) : n에 따라 n번, n+10번, 3n+10번 등 실행

```python
  for(index in range(n)) {
    print(index)
  }
```

##### O(n^2) : n에 따라 n^2번, n^2+1000번, 100n^2-100번 등 실행

```python
let a = 1;
for num in range(n) :
  for index in range(n):
    print(index)
```



<img width="500" alt="스크린샷 2021-10-19 오후 4 29 09" src="https://user-images.githubusercontent.com/87749134/137863352-d246161a-1e8c-488f-8c4f-e3ba107ea5b9.png">

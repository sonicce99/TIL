# 최대공약수와 최소공배수 => 유클리드 호제법



### 최대공약수

- 줄여서 GCD 라고 쓴다.(Greatest Common Divisor)



#### 유클리드 호제법

- GCD(a,b) = GCD(b,r) 일 때 r === 0 이라면 그때의 b가 최대공약수. (단 a>b)

  > GCD(24,16) = GCD(16,8) = GCD(8,0) => 24와 16의 쵀대공약수는 8

```javascript
  function getGCD (a,b) {
    if(b>0) {
      return getGCD(b,a%b);
    }
    else {
      return a
    }
  }
```

한 줄로 표현 하면

```javascript
  let getGCD = (a, b) => (b > 0 ? getGCD(b, a % b) : a);
```

*a < b의 경우에는 값이 자동스왑된다. ex) a=16, b=24일 경우에는 getGCD(24, (16%24=16))이 불러지게 된다.*





### 최소공배수

- 줄여서 LCM 라고 쓴다. (Least Common Multiple)

최소공배수 = 두 수의 곱 / 최대공약수  

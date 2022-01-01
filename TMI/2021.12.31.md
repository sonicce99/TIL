# Proxy

Proxy 영어 뜻

<img width="400" alt="스크린샷 2021-12-31 오후 3 03 41" src="https://user-images.githubusercontent.com/87749134/147806428-ccdbfc27-833a-408e-b0d3-40ff1a7fa2f1.png">

- 유용한 유튜브 : https://www.youtube.com/watch?v=YxwYhenZ3BE


### 문법

##### 기본 생성

```javascript
const a = new Proxy(target, handler)
```

##### 응용 사용법

🌟 ↓↓↓ 트랩이 없는 경우 (target에 작업이 직접 수행됨)

```javascript
let target = {};
let proxy = new Proxy(target, {}); // 빈 핸들러

proxy.test = 5; // 프락시에 값을 씁니다. -- (1)

console.log(proxy); // {test: 5}
console.log(target); // {test: 5}

alert(target.test); // 5, target에 새로운 프로퍼티가 생겼네요!

alert(proxy.test); // 5, 프락시를 사용해 값을 읽을 수도 있습니다. -- (2)

for(let key in proxy) alert(key); // test, 반복도 잘 동작합니다. -- (3)
```

- target : 감싸지게 될 객체로, 함수를 포함한 모든 객체가 가능.

- handler : 동작을 가로채는 메서드인 *트랩(trap)* 이 담긴 객체로, 여기서 프록시를 설정.

> get 트랩, set 트랩이 있음.


<img width="500" alt="스크린샷 2021-12-31 오후 3 27 09" src="https://user-images.githubusercontent.com/87749134/147807294-6709a6c6-4110-4ce4-baf2-ce158bf585e4.png">

*Proxy는 일반 객체와는 다른 행동 양상을 보이는 '특수 객체(exotic object)'입니다.*
*프로퍼티가 없죠. handler가 비어있으면 Proxy에 가해지는 작업은 target에 곧바로 전달됩니다.*


🌟 ↓↓↓ 트랩이 있는 경우

```javascript
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // 기본값
    }
  }
});

alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (해당하는 요소가 배열에 없으므로 0이 반환됨)
```


```javascript
let dictionary = {
  'Hello': '안녕하세요',
  'Bye': '안녕히 가세요'
};

alert( dictionary['Hello'] ); // 안녕하세요
alert( dictionary['Welcome'] ); // undefined
```

🌟 지금 상태론 dictionary에 없는 구절에 접근하면 undefined가 반환됩니다. 사전에 없는 구절을 검색하려 했을 때 undefined가 아닌 구절 그대로를 반환해주는 게 좀 더 나을 것 같다는 생각이 드네요.



```javascript
let dictionary = {
  'Hello': '안녕하세요',
  'Bye': '안녕히 가세요'
};

dictionary = new Proxy(dictionary, {
  get(target, phrase) { // 프로퍼티를 읽기를 가로챕니다.
    if (phrase in target) { // 조건: 사전에 구절이 있는 경우
      return target[phrase]; // 번역문을 반환합니다
    } else {
      // 구절이 없는 경우엔 구절 그대로를 반환합니다.
      return phrase;
    }
  }
});

// 사전을 검색해봅시다!
// 사전에 없는 구절을 입력하면 입력값이 그대로 반환됩니다.
console.log( dictionary['Hello'] ); // 안녕하세요
console.log( dictionary['Welcome to Proxy']); // Welcome to Proxy (입력값이 그대로 출력됨)
```

🌟 dictionary를 프락시로 감싸서 프로퍼티를 읽으려고 할 때 이를 프락시가 가로채도록 하면 우리가 원하는 기능을 구현할 수 있습니다.

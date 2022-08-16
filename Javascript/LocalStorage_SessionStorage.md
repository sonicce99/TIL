# LocalStorage 와 SessionStorage


웹 브라우저 자체에 있는 특정 저장 공간  

Storage 에는 LocalStorage 와 SessionStorage 2가지가 있다.

문법 자체는 동일 하지만 쓰임새가 다르다.

최대 5MB까지 가능 (문자열로 따지면 엄청나게 저장가능함.)

**저장은 string만 가능함.**

## ❗️ 여기서 드는 의문

`쿠키를 사용하면 브라우저에 저장할 수 있는데 왜 이걸 또 사용하는 걸까요?`

- 쿠키와 다르게 웹 스토리지 객체는 네트워크 요청 시 서버로 전송되지 않습니다. 이런 특징 때문에 쿠키보다 더 많은 자료를 보관할 수 있습니다. 대부분의 브라우저가 최소 2MB 혹은 그 이상의 웹 스토리지 객체를 저장할 수 있도록 해줍니다. 또한 개발자는 브라우저 내 웹 스토리지 구성 방식을 설정할 수 있습니다.

- 쿠키와 또 다른 점은 서버가 HTTP 헤더를 통해 스토리지 객체를 조작할 수 없다는 것입니다. 웹 스토리지 객체 조작은 모두 자바스크립트 내에서 수행됩니다.

- 웹 스토리지 객체는 도메인·프로토콜·포트로 정의되는 오리진(origin)에 묶여있습니다. 동일한 origin을 가진 모든 창에서 공유되며 프로토콜과 서브 도메인이 다르면 데이터에 접근할 수 없습니다.  

***


**if(배열이나 object를 저장하고 싶은 경우에는 JSON.stringify() 로 문자열로 바꿔서 저장.)**

ex) storage.html ↓↓

> let arr = ["a", "b"]

> localStorage.setItem("arr", JSON.stringify(arr))



ex) storage2.html ↓↓

> console.log(localStorage.getItem("arr"));

  >> 출력은 ["a", "b"] 로 나오지만 string형임.


> console.log(JSON.parse(localStorage.getItem("arr")));

  >> 출력이 배열 타입으로 출력됨.

두 스토리지 객체는 동일한 메서드와 프로퍼티를 제공합니다.

```javascript
console.log(window.localStorage);
```

![스크린샷 2022-08-16 오전 10 14 12](https://user-images.githubusercontent.com/87749134/184775025-7d55d5a1-ee76-4df5-b8df-601fec2fc280.png);

- `( local / session )Storage.setItem(key, value)` : 키-값 쌍을 보관합니다.

- `( local / session )Storage.getItem(key)` : 키에 해당하는 값을 받아옵니다.

- `( local / session )Storage.removeItem(key)` : 키와 해당 값을 삭제합니다.

- `( local / session )Storage.clear()` : 모든 것을 삭제합니다.

- `( local / session )Storage.key(index)` : 인덱스(index)에 해당하는 키를 받아옵니다.

- `( local / session )Storage.length` : 저장된 항목의 개수를 얻습니다.  



***

## LocalStorage  

- 스토리지에 저장된 값을 삭제하기 전까지에는 브라우저에 계속 남아있다.

- PC의 브라우저에 접속했다면 PC 브라우저에 남고 Tablet 브라우저에 접속했다면 Tablet 브라우저에 남음. (현재 사용하고 있는 기기의 브라우저에 저장, 도메인 별로 따로 저장)


**사용자 로그인 정보, 사용자의 언어, 테마 같은 정보를 localstorage에 저장**



1. 브라우저가 Storage 를 지원 하는지 체크
2. setItem 을 통해 저장  

ex) storage.html ↓↓

```javascript
  // undefined가 아니면 현재 브라우저가 Storage를 지원한다는 뜻
  if(typeof(Storage) !== "undefined") {
    localStorage.setItem("%%%","!!!"); // key와 value 값을 각각 넣어준다.
  }
```


ex)storage2.html ↓↓

```javascript
  console.log(localStorage.getItem("%%%")) // 다른 html에서 key 값을 넣어준다.
```



<img width="700" alt="스크린샷 2021-11-10 오후 5 06 15" src="https://user-images.githubusercontent.com/87749134/141074341-36946673-2b61-475d-b84d-6f09d91247bb.png">


<img width="700" alt="스크린샷 2021-11-10 오후 5 07 01" src="https://user-images.githubusercontent.com/87749134/141074345-071178d0-dd7c-4f81-a5a4-fdd3a1882678.png">


<img width="673" alt="스크린샷 2021-11-10 오후 5 09 50" src="https://user-images.githubusercontent.com/87749134/141074669-27a0fb47-6b9e-4229-b31c-c566f653bd55.png">


- storage.html 파일에서 저장된 값을 storage2.html의 콘솔에 나타나게 된다!

*("name","dong su") 를 set 하고 get으로 "name" 하면 dong su 가 출력됨.*


### 키 순회하기  

```javascript
for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  console.log(`${key}: ${localStorage.getItem(key)}`);  
}
```


***


##  SessionStorage  

- `sessionStorage`는 현재 떠 있는 탭 내에서만 유지됩니다.

  > 같은 페이지라도 다른 탭에 떠 있으면 다른 곳에 저장됩니다. 

- 브라우저 창을 닫는 순간 사라짐. (페이지를 닫은 후 해당 url로 재접속 하면 null로 나타남.)

- 페이지를 새로고침 할 때 `sessionStorage`에 저장된 데이터는 사라지지 않습니다. 하지만 탭을 닫고 새로 열ㄷ 때는 사라집니다.  


ex) storage.html ↓↓

```javascript
// undefined가 아니면 현재 브라우저가 Storage를 지원한다는 뜻
if(typeof(Storage) !== "undefined") {
  sessionStorage.setItem("%%%","!!!"); // key와 value 값을 각각 넣어준다.
}
```


ex)storage2.html ↓↓

```javascript
console.log(sessionStorage.getItem("%%%")) // 다른 html에서 key 값을 넣어준다.
```

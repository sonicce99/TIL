# LocalStorage 와 SessionStorage


웹 브라우저 자체에 있는 특정 저장 공간  

Storage 에는 LocalStorage 와 SessionStorage 2가지가 있다.

문법 자체는 동일 하지만 쓰임새가 다르다.

최대 5MB까지 가능 (문자열로 따지면 엄청나게 저장가능함.)

**저장은 string만 가능함.**

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

***

#### LocalStorage  


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


***


###  SessionStorage


- 브라우저 창을 닫는 순간 사라짐. (페이지를 닫은 후 해당 url로 재접속 하면 null로 나타남.)


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

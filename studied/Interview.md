# 프론트엔드 면접 질문

### http와 https 통신 방식 차이

결정적인 차이는 보안이다. http방식은 네트워크상에서 정보를 누군가가 마음대로 열람, 수정이 가능하다. https는 누가 볼 수 없도록 막음. http 방식이 https 방식보다 빠르다. http방식은 민감한 정보를 다룰 때 항상 변조, 해킹 가능성을 생각해야한다. https는 설치 및 인증서를 유지하는데 추가적인 비용이 발생.

따라서 민감한 정보가 있는 페이지의 경우 https로, 아니면 http로 만들면 된다.

### 웹 프로토콜

웹 프로토콜은 웹에서 쓰이는 통신규약입니다. http와 https가 있습니다.

### 비동기 프로그래밍

- Ajax란 무엇인가

자바스크립트를 이용해 비동기적으로 서버와 브라우저가 데이터를 교환할 수 있는 통신 방식.
보통은 서버로부터 웹 페이지가 반환되면 전체를 갱신해야하는데/ Ajax로는 페이지 일부만을 갱신한다.

- Async, Await

Promise를 더욱 쉽게 사용할 수 있도록 합니다.
함수 앞에 Async 키워드를 추가하고 Promise 앞부분에 Await 키워드를 사용합니다.
async, await 코드를 사용하면 코드가 간결해지지만 try,catch 구문을 통해 에러처리를 해야합니다.

### 원시타입의 종류

총 6개이며, number, string, null, undefined, symbol, boolean 이 있다.

### 브라우저 저장소에 대해서 설명해 보세요

- ex) 로컬 스토리지, 세션 스토리지, 쿠키 각각 설명

쿠키는 4KB를 저장하고 로컬, 세션은 5MB를 저장한다.
로컬 스토리지는 데이터를 저장하고 브라우저를 종료하더라도 데이터가 남아있는 반면
세션 스토리지는 브라우저가 종료되면 데이터도 삭제된다.
쿠키는 http 요청과 함께 정보를 서버로 다시 전달해주지만 로컬스토리지는 데이터를 클라이언트 측에 보유한다.

### 바벨이란 무엇인가요?

- 내 대답 : 프로젝트를 할 때 사용한 여러 패키지들의 버전을 올리거나 낮추는데 사용합니다.

- 인터넷 서치 : 크로스 브라우징 이슈를 해결하기 위해서 생겨난 툴이다. 모든 브라우저에서 동작할 수 있도록 해주는 트렌스파일러이다.

### Node.js란 무엇인가요?

- Node.js는 Chrome V8 Javascript 엔진으로 빌드된 Javascript 런타임이다.

### Virtual DOM이 무엇인가요?

- 가상 DOM을 활용하면 기존의 DOM과 변경된 부분만 부분 렌더링을 할 수 있다. 가상 DOM을 사용하지 않는다면 매번 변경되지 않는 부분까지 전체 렌더링을 해야할 것이다.

### this란 무엇인가요?

자바스크립트의 함수는 호출될 때, 매개변수로 전달되는 인자값 이외에, arguments 객체와 this를 암묵적으로 전달받는다.

- Java에서 this는 인스턴스 자기 자신을 가르키지만, 자바스크립트에서는 함수 호출 방식에 따라서 달라진다. 실행컨텍스트가 실행될 때 결정되게 된다. 

함수 호출 방식은 다양하다.

1. 함수 호출

2. 메서드 호출

3. 생성자 함수 호출 (인스턴스 생성)  

4. apply/ call/ bind 호출

### 싱글스레드인 자바스크립트가 여러가지 작업을 비동기 처리를 할 수 있는 이유는 무엇인가요?

참고 자료 : https://sculove.github.io/post/javascriptflow/  

- Event Loop 와 Queue

- Event Loop는 반복해서 call stack과 queue 사이의 작업들을 확인하고, call stack이 비워있는 경우 queue에서 작업을 꺼내어 call stack에 넣는다.

- Event Loop는 stack에 처리할 작업이 없을 경우 우선적으로 microtask queue를 확인한다. microtask queue에 작업이 있다면 microtask에 있는 작업을 꺼내서 call stack에 넣는다. 만약 microtask의 queue가 비어서 더 이상 처리할 작업이 없으면 이때 task queue를 확인한다. task queue의 작업도 꺼내서 call stack에 넣는다.

꽤나 복잡한 과정이지만 꼭! 명심해야할 것이 있다.

1. 비동기 작업으로 등록되는 작업은 task와 microtask. 그리고 animationFrame 작업으로 구분된다.
2. microtask는 task보다 먼저 작업이 처리된다.
3. microtask가 처리된 이후 requestAnimationFrame이 호출되고 이후 브라우저 랜더링이 발생한다.

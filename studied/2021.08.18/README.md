<h2>배치</h2>

<h3>position (요소의 위치 지정 기준)</h3>

- relative : 요소 자신을 기준
- absolute : 위치 상 부모 요소를 기준
- fixed : 뷰포트(브라우저) 기준
- static : 기준 없음

relative는 실제로 배치하는 용도로는 안쓴다. 보통 position-absolute의 구조상의 부모요소의 위치상 부모요소가 될 수 있도록 position 값을 부여하는 용도로 사용


<h3>요소 쌓임 순서(Stack order) : 어떤 요소가 사용자와 더 가깝게 있는지 (위에 쌓이는지) 결정</h3>

1. 요소에 position 속성 값이 있는 경우 위에 쌓임. (기본값 static 제외)
2. 1번 조건이 같은 경우,  z-index 속성의 숫자 값이 높을 수록 위에 쌓임. (작성이 안되있으면 0)
3. 1,2번 조건까지 같은 경우, html의 코드가 나중에 작성될 수록 위에 쌓임.


position 속성 값으로 absolute, fixed가 지정된 요소는 display 속성이 block으로 변경됨.


<h2>Flex</h2> : 수평정렬

- display: flex가 부여된 요소는 Flex container라고 부르고 container의 자식 요소들은 Flex items 라고 부름.

- display: inline-flex : 인라인 요소와 같이 Flex container 정의

- flex-direction : 주 축을 설정 (수평정렬 할지 수직정렬 할지 row or column)

- flex-wrap : Flex items 의 줄 바꿈 여부 (기본값  no wrap)

<img width="400" height = "300" alt="스크린샷 2021-08-18 오후 2 56 11" src="https://user-images.githubusercontent.com/87749134/129845470-59a1b616-9c29-42a7-992e-933eacf269f1.png">

- justify-content : 수평 정렬 방법 (기본값: flex-start, flex-end, center)

- align-content : 수직 정렬 방법 (여러줄) ( 기본값: stretch, flex-start, flex-end, center)

- align-items : 수직 정렬 방법 (한 줄) ( 기본값: stretch, flex-start, flex-end, center)

***
-  order : flex items들의 순서 (기본값 : 0, 숫자가 작을 수록 앞에 정렬됨)

- flex-grow : flex items의 증가 너비 비율 (빈 공간을 어떻게 채울지에 대한 비율)

<img width="400" height ="300%" alt="스크린샷 2021-08-18 오후 3 25 03" src="https://user-images.githubusercontent.com/87749134/129848312-45c53af0-0017-4fc0-bd65-937c2e47c0e9.png">

- flex-shrink (기본값 :0)

- flex- basis : flex items의 공간 배분 전 기본 content 너비 (기본값 : 0)


***
<h2>IP Quiz 공부 내용</h2>
```
  <ul>
    <li>딸기</li>
    <li>수박</li>
    <li class="orange">오렌지</li>
    <li>망고</li>
    <li>사과</li>
  </ul>
  ```
다음 코드에서 망고와 사과를 선택하기 위한 선택자 : .orange ~ li
망고를 선택하기 위한 선택자 : .orange + li
오렌지를 선택하기 위한 선택자 : ul > .orange


개발할 때 더 중요한 것은 자바스크립트가 어떻게 동작하는지를 먼저 알고 개발을 시작해야 한다는 것이다.
JavaScript는 동기식 언어이다.
자바스크립트는 한 번에 하나의 작업을 수행한다.
한 작업이 실행되는 동안 다른 작업은 멈춘 상태를 유지하고 자신의 차례를 기다리는 것을 말한다.
마치 음식점에 여러 사람들과 갔을 때, 키오스크를 이용하여 한 사람씩 결제하는 것과 유사하다.
이러한 동작을 단일 스레드(싱글 스레드), 동기(Synchronous)라고 부른다.

비동기(asynchronous)란?
비동기는 어떠한 요청을 보내면 그 요청이 끝날 때까지 기다리는 것이 아니라, 응답에 관계없이 바로 다음 동작이 실행되는 방식을 말한다.
왜 필요한가?
예를, 웹 페이지가 로딩되거나, 어떠한 동작(Event) 하나가 30초 이상이 걸린다고 상상해보자.
그렇게 되면, 웹 페이지는 이 동작이 끝날 때까지 화면에 나타나지 않거나 다음 동작을 수행하는데 지장을 주게 된다.
또, 요즘 사용자들은 느리고 응답이 없는 웹 사이트를 원하지 않는다.
그렇기 때문에 자바스크립트가 웹 사이트에서 동작할 때, 비동기적으로 동작할 수 있어야 한다.
브라우저에서의 자바스크립트 실행 환경(Runtime)에서는 자바스크립트 엔진 자체가 제공하지 않는 일부 기능인 DOM 조작이나 AJAX 같은 비동기 처리를 위한 web API를 제공한다.
또, 이를 제어하기 위해 이벤트 루프(Event Loop), 이벤트 큐(Callback Queue 혹은 task Queue)가 존재한다.


hoisting : var or function 같은 선언들이 자동으로 제일 코드 위로 올라가는 것.

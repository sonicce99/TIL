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

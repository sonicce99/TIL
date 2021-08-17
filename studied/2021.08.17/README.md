<h1>CSS 속성</h1>

<span> 은 대표적인 인라인 요소
본질적으로 아무것도 나타내지 않음.
자동으로 가로너비가 최대로 줄어들려고 함.

<div> 는 대표적인 블럭 요소
본질적으로 아무것도 나타내지 않음.
자동으로 가로너비가 최대로 늘어나려고 함.

인라인 요소는 본질적으로 가로사이즈와 세로사이즈를 지정할 수 없다

<h3>css 단위</h3>
px
%
em: 요소의 글꼴 크기 (상대적)
rem: 루트 요소(html)의 글꼴 크기   
vw: 뷰포트 가로 너비의 백분율 (화면을 넓히거나 줄이면 자동으로 가로 너비도 조정)
vh: 뷰포트 세로 너비의 백분율


<h3>margin</h3>
margin: 10px → 상하좌우 10px씩
margin: 10px 20px → 상하 10px, 좌우 20px
margin: 10px 20px 30px → 상 10px, 좌우 20px, 하 30px
margin: 10px 20px 30px 40px → 상10px, 오른쪽 20px, 아래 30px, 왼쪽 40px (시계방향)

margin 에 음수가 되면 서로 겹치게 된다.


<h3>border</h3>
border: 선-두께 선-종류 선-색상 (테두리선의 두께가 굵어질수록 요소의 크기가 커진다)
border: 10px solid orange;
border-width, border-style, border-color

border-top:
border-top-width:
border-top-style:
border-top-color:

<h3>글꼴</h3>
- font-size:  (기본값은 16px)
- font-weight:  (글씨를 두껍게) 100~900 (보통 노멀은 400, 두껍게는 700)
- font-style:  (글자의 기울기)
- font-family: (글씨체)
- line-height: (줄과 줄 사이의 거리)


인라인 요소를 블럭요소로 바꾸고 싶다면?
display: block;

a태그에서 밑줄을 없애고 싶다면?
text-decoration: none;

<h3>문자</h3>
- text-align: center; (문자 정렬방식)
- text-indent: (들여쓰기)


<h3>배경</h3>
background-color: orange;
background-image: url("경로")
background-posioin: center; or top right; (배경을 가운데 위치)
background-repeat:
background-size: cover(넓은 너비에 맞춰짐) or contain(짧은 너비에 맞춰짐)
background-attachment: scroll or fixed

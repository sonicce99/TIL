# SOP, CORS 내용정리   

<img width="692" alt="스크린샷 2021-12-07 오후 1 37 17" src="https://user-images.githubusercontent.com/87749134/144967220-9f00cebe-97bb-402e-a6be-8ffa86d1be46.png">

> Access to XMLHttpRequest at '주소A' from origin '주소B' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.


#### 여기서 origin 이라는 용어를 이해하자.  

<img width="700" alt="스크린샷 2021-12-07 오후 2 22 58" src="https://user-images.githubusercontent.com/87749134/144971404-4b1d4d1d-3427-4664-999b-d960151b2a30.png">


origin 은 간단하게 주소를 말한다. [프로토콜]://[Host의 ip주소 또는 Url]:[포트번호]

다른 origin 이라고 하면 프로토콜(http,https)이 다르거나 주소가 다르거나 포트번호(80,433) 가 다르다는 뜻. (포트번호는 생략가능 https는 443, http는 80)

> https://www.동수의로그북.com/path/page.html

> https://www.동수의로그북.com:443/path2/page.html

*위의 2가지 origin은 same origin임*  

### SOP??  

#### 대부분의 웹 브라우저는 SOP (Same Origin Policy) 라는 보안 정책을 준수한다.   

내가 접속한 사이트(Origin)에서 다른 Origin에 요청한 것을 기본적으로 제한해서 어느정도 해커의 공격에 방어하는 것이다.
다른 Origin에서 온 자원들을 모두 사용할 수 없게 차단했다면 CDN과 같은 것을 사용하기 어려웠을 것이다.
그래서 <img>, <script>, <link>, <iframe>과 같은 특정 HTML Tag는 다른 Origin으로부터 온 것은 임베딩할 수 있게 허용해준다. (임베딩만 가능하고 데이터를 읽는 건 보안상의 이유로 차단한다.) 하지만 우리는 개발하다보면 다른 Origin으로부터의 자원을 불러오고 싶은 경우가 많다. 그렇기 때문에 CORS(Cross Origin Resource Sharing)이라는 것이 생겼다. 다른 Origin의 데이터를 읽고 싶으면 CORS 표준을 지켜서 내 사이트로부터의 응답에 "다른 Origin이더라도 허용해줘!" 라고 말해주면 된다.  


- 들어보면 유용한 유튜브 : https://youtu.be/6QV_JpabO7g  

- 유용한 블로그

1. https://coding-groot.tistory.com/91  

2. https://xiubindev.tistory.com/115


### CORS?  

SOP가 우리가 더 안전하게 웹을 탐색할 수 있게하지만 의도적으로 다른 리소스랑 상호작용하면서 개발하고 싶은 경우에는 너무 제한적이다. 내가 이해한 바로는 그럴 때 써라고 만든게 CORS이다. SOP를 좀 완화해준 느낌?
CORS를 사용해서 하나의 Origin만 읽는게 아니라 내가 명시한 다른 신뢰 가능한 Origin으로부터 받은 리소스를 읽어들이는 법에 관해 알아보자.


### 해결방법

1. 내가 서버를 제어 할 수 있는 경우  

Access-Control-Allow-Origin 헤더에 이 데이터를 읽을 수 있는 origin을 따로 넣어줍니다.

> 허용하고 싶은 origin을 따로 넣어주면 전송된 데이터를 읽을 때 origin은 다르지만 허용 origin 목록에 있네? 하고서 이 데이터를 읽을 수 있게 됨.

#### 응답하는 서버 - "특정 사이트는 다른 Origin이라도 허용해!"

"Access-Control-Allow-Origin": 사이트명

허용할 Origin을 Access-Control-Allow-Origin 응답 헤더에 넣어주면 된다. 그러면 다른 Origin일지라도 json 데이터와 같은 자원들을 응답하고 읽을 수 있게 된다.

- 모든 사이트를 허용하는 경우: "Origin을 Access-Control-Allow-Origin": *

> 사실 이러면 이러한 보안 정책을 사용하는 의미가 없다.

- 특정한 사이트만 허용하는 경우: "Origin을 Access-Control-Allow-Origin": https://www.coding-groot.tistory.com/  


2.  Proxy 를 사용하자.

나의 Proxy 서버를 구축하게 되면 더 이상 클라이언트에서 서버로 바로 요청하는 것이 아니라, 현재 개발 서버의 주소(Proxy 서버 주소)로 요청을 하게 됩니다. 그럼 개발 서버는 백엔드 서버로 전달하고, 백엔드 서버에서 응답한 내용을 다시 브라우저 쪽으로 반환합니다.

*CORS는 브라우저에 관련된 정책이기 때문에, 브라우저를 통하지 않고 서버간 통신을 할 때에는 이 정책이 적용되지 않는다.*

111.111.111.111 이라는 IP 를 가진 유저가 인터넷에 어떠한 요청을 하게 되는 경우에 IP 가 전달되는데,
인터넷에서 유저의 IP를 받을 때에는 프록시 서버가 임의로 유저의 IP를 변경할 수 있다.
즉, *인터넷 쪽에서 유저의 실제 IP를 알 수 없도록 하는 것이 프록시 서버의 역할이다.*

뿐만 아니라 클라이언트에서 데이터를 보낼 때 프록시 서버에서 데이터를 바꿔서 서버로 전달할수도 있다.
따라서 따른 origin에서 요청이 왔다는 것을 브라우저가 인식하지 못하게 하여 Cors 에러를 피할 수 있다.
​

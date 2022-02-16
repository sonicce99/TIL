# WEB server 와 WAS 차이

## WEB?

- 인터넷을 기반으로 한 서비스 정보를 공유, 검색 할 수 있게 하는 서비스

- HTTP(통신 규칙), URL (주소), HTTP(통신 규칙), HTML (내용)

## Server?

- 클라이언트에게 네트워크를 통해 정보나 서비스를 제공하는 컴퓨터 시스템

## WEB Server

- 인터넷을 기반으로 클라이언트에게 웹 서비스를 제공하는 컴퓨터  


***

## Web Application?

- 웹에서 실행되는 응용 프로그램  

## Web Application Server (WAS)

- Web Application Container 라고도 불림  

- 웹 어플리케이션과 서버 환경을 만들어 동작시키는 기능을 제공하는 소프트웨어 프레임워크

- 웹 어플리케이션을 실행시켜 필요한 기능을 수행하고 그 결과를 웹 서버에게 전달하는 미들웨어  

> 좀 더 동적인 (HTML 에서는 하지 못했던 반복문 실행 등 을 해서 서버에게 넘겨 줄 수 있다.)

- PHP, JSP, ASP 와 같은 언어들을 사용해 동적인 컨텐츠를 생성할 수 있는 서버    

- 웹 서버 + 웹 컨테이너의 개념  
  - 컨테이너 : JSP, servlet 을 실행시킬 수 있는 소프트웨어


<img width="653" alt="스크린샷 2022-02-13 오전 10 57 16" src="https://user-images.githubusercontent.com/87749134/153735022-b67ec225-9b1e-450a-8e61-23e1b61fe62e.png">

↓ 시중 제품군  

<img width="653" alt="스크린샷 2022-02-13 오전 10 59 39" src="https://user-images.githubusercontent.com/87749134/153735054-2e9751e1-56a6-41ab-a9b3-c7db21b9f055.png">


## 결론

### Web Server

- 정적인 콘텐츠, 페이지만 줄 수 있음.   

### WAS

-  어플리케이션을 돌리고 , DB를 연결을 하고 동작을 수행시켜서 만들어진 데이터를 줄 수 있는 서버  

> 상황에 따라서 변하는 정보를 제공할 수 있는가의 차이  

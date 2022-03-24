# Single Page Application & Routing

## SPA 장점

1. 전체적인 트래픽 감소

> 페이지 갱신에 필요한 데이터만을 JSON으로 전달받아 페이지를 갱신하므로

2. 새로고침이 발생하지 않음

> 전체 페이지를 다시 렌더링하지 않고 변경되는 부분만을 갱신하므로 새로고침이 발생하지 않아 네이티브 앱과 유사한 사용자 경험을 제공할 수 있다.

link tag를 사용하는 전통적인 화면 전환 방식은 새로운 페이지 요청 시마다 정적 리소스가 다운로드되고 전체 페이지를 다시 렌더링하는 방식을 사용하므로 새로고침이 발생되어 사용성이 좋지 않다. 그리고 변경이 필요없는 부분까지 포함하여 전체 페이지를 갱신하므로 비효율적이다.


## SPA 단점

1. 초기 구동 속도

> 웹 애플리케이션에 필요한 모든 정적 리소스를 최초 접근시 단 한번 다운로드하기 때문에 초기 구동 속도가 상대적으로 느리다.

2. SEO(검색엔진 최적화) 이슈

> SPA는 일반적으로 서버 사이드 렌더링(SSR) 방식이 아닌 자바스크립트 기반 비동기 모델의 클라이언트 사이드 렌더링(CSR) 방식으로 동작한다. 클라이언트 사이드 렌더링(CSR)은 일반적으로 데이터 패치 요청을 통해 서버로부터 데이터를 응답받아 뷰를 동적으로 생성하는데 이때 브라우저 주소창의 URL이 변경되지 않는다. 이는 사용자 방문 history를 관리할 수 없음을 의미하며 SEO 이슈의 발생 원인이기도 하다.

***

## SPA와 Routing

전통적인 링크 방식에서 SPA까지 발전하게 된 과정과 SPA의 라우팅(Routing)에 대해 살펴보도록 하자.

다음과 같이 4개의 방식이 있다.

```bash
# 전통적 링크 방식 // 새로고침, 트래픽 문제 발생  
$ npm run link

# ajax 방식 // history 관리 안됨, SEO 문제 발생
$ npm run ajax

# hash 방식 // history 관리 가능, SEO 문제 발생
$ npm run hash

# pjax(pushState + ajax) 방식 // 모든 문제 해결 가능  
$ npm run pjax
```

### 전통적 링크 방식

```html
<body>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/service.html">Service</a></li>
      <li><a href="/about.html">About</a></li>
    </ul>
  </nav>
  <section>
    <h1>Home</h1>
    <p>This is main page</p>
  </section>
</body>
```

link tag(<a href="/service.html">Service</a> 등)을 클릭하면 href 어트리뷰트 값인 리소스 경로가 URL의 path에 추가되어 주소창에 나타나고 해당 리소스를 서버에 요청한다.

이때 서버는 html로 화면을 표시하는데 부족함이 없는 완전한 리소스를 클라이언트에 응답한다. 이를 서버 사이드 렌더링(SSR)이라 한다. 브라우저는 서버가 응답한 html을 응답받아 렌더링한다. 이때 응답받은 html로 전체 페이지를 다시 렌더링하게 되므로 새로고침이 발생한다.

이 방식은 자바스크립트의 도움 없이 응답받은 html만으로 렌더링이 가능하며 각 페이지마다 고유의 URL이 존재하므로 history 관리 및 SEO 대응에 아무런 문제가 없다. 하지만 요청마다 중복된 리소스를 응답받아야 하며 전체 페이지를 다시 렌더링하는 과정에서 새로고침이 발생하여 사용성이 좋지 않은 단점이 있다.

### ajax 방식

전통적 링크 방식은 현재 페이지에서 수신된 html로 화면을 전환하는 과정에서 전체 페이지를 새롭게 렌더링하게 되므로 새로고침이 발생한다. 간단한 웹페이지라면 문제될 것이 없겠지만 복잡한 웹페이지의 경우, 요청마다 중복된 HTML과 CSS, JavaScript를 매번 다운로드해야하므로 속도 저하의 요인이 된다.

이러한 단점을 보완하기 위해 등장한 것이 ajax(Asynchronous JavaScript and XML)이다. ajax는 자바스크립트를 이용해서 비동기적(asynchronous)으로 서버와 브라우저가 데이터를 교환할 수 있는 통신 방식을 의미한다.

```HTML
<body>
  <nav>
    <ul id="navigation">
      <li><a href="/">Home</a></li>
      <li><a href="/service">Service</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
  <div id="root">Loading...</div>
</body>
```

위 예제를 살펴보면 link tag(<a href="/service">Service</a> 등)의 href 어트리뷰트에 path를 사용하고 있다. 따라서 내비게이션이 클릭되면 path가 추가된 URL이 서버로 요청된다. 하지만 ajax 방식은 내비게이션 클릭 이벤트를 캐치하고 preventDefault 메서드를 사용해 서버로의 요청을 방지한다. 이후, href 어트리뷰트에 path을 사용하여 ajax 요청을 하는 방식이다.

> ❗️ ajax 요청은 주소창의 url을 변경시키지 않으므로 history 관리가 되지 않는다.


### Hash 방식

ajax 방식은 불필요한 리소스 중복 요청을 방지할 수 있고 새로고침이 없는 사용자 경험을 구현할 수 있다는 장점이 있지만 history 관리가 되지 않는 단점이 있다. 이를 보완한 방법이 Hash 방식이다.

Hash 방식은 URI의 fragment identifier(#service)의 고유 기능인 앵커(anchor)를 사용한다. fragment identifier는 hash mark 또는 hash라고 부르기도 한다.

<img width="702" alt="스크린샷 2022-03-22 오전 10 11 11" src="https://user-images.githubusercontent.com/87749134/159387779-4a815d8f-9744-43a3-af40-1fc70c13ecfa.png">

```HTML
<body>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#service">Service</a></li>
      <li><a href="#about">About</a></li>
    </ul>
  </nav>
  <div id="root">Loading...</div>
</body>
```

위 예제를 살펴보면 link tag(<a href="#service">Service</a> 등)의 href 어트리뷰트에 hash를 사용하고 있다. 즉, 내비게이션이 클릭되면 hash가 추가된 URI가 주소창에 표시된다.

단, URL이 동일한 상태에서 hash만 변경되면 브라우저는 서버에 어떠한 요청도 하지 않는다.

즉, URL의 hash는 변경되어도 서버에 새로운 요청을 보내지 않으며 따라서 페이지가 갱신되지 않는다. hash는 요청을 위한 것이 아니라 fragment identifier(#service)의 고유 기능인 앵커(anchor)로 웹페이지 내부에서 이동을 위한 것이기 때문이다.

또한 hash 방식은 서버에 새로운 요청을 보내지 않으며 따라서 페이지가 갱신되지 않지만 페이지마다 고유의 논리적 URL이 존재하므로 history 관리에 아무런 문제가 없다.

hash 방식은 url의 hash가 변경하면 발생하는 이벤트인 ```hashchange``` 이벤트를 사용해 hash의 변경을 감지하고 url의 hash를 취득해 필요한 ajax 요청을 수행한다.

hash 방식의 단점은 url에 불필요한 #이 들어간다는 것이다. 일반적으로 hash 방식을 사용할 때 #!을 사용하기도 하는데 이를 해시뱅(Hash-bang)이라고 부른다.

문제는 SEO 이슈이다. 웹 크롤러는 검색 엔진이 웹사이트의 콘텐츠를 수집하기 위해 HTTP와 URL 스펙(RFC-2396같은)을 따른다. 이러한 크롤러는 JavaScript를 실행시키지 않기 때문에 hash 방식으로 만들어진 사이트의 콘텐츠를 수집할 수 없다. 구글은 해시뱅을 일반적인 URL로 변경시켜 이 문제를 해결한 것으로 알려져 있지만 다른 검색 엔진은 hash 방식으로 만들어진 사이트의 콘텐츠를 수집할 수 없을 수도 있다.

### pjax 방식

hash 방식의 가장 큰 단점은 SEO 이슈이다. 이를 보완한 방법이 HTML5의 History API인 pushState와 popstate 이벤트를 사용한 pjax(pushState + ajax) 방식이다. pushState와 popstate은 IE 10 이상에서 동작한다.

```HTML
<body>
  <nav>
    <ul id="navigation">
      <li><a href="/">Home</a></li>
      <li><a href="/service">Service</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
  <div id="root">Loading...</div>
</body>
```

위 예제를 살펴보면 link tag(<a href="/service">Service</a> 등)의 href 어트리뷰트에 path를 사용하고 있다. 따라서 내비게이션이 클릭되면 path가 추가된 URL이 서버로 요청된다. 하지만 pjax 방식은 내비게이션 클릭 이벤트를 캐치하고 preventDefault 메서드를 사용해 서버로의 요청을 방지한다. 이후, href 어트리뷰트에 path을 사용하여 ajax 요청을 하는 방식이다.

여기까진 ajax와 같다.

이때 ajax 요청은 브라우저 주소창의 URL을 변경시키지 않아 history 관리가 불가능하다. 이때 사용하는 것이 pushState 메서드이다. pushState 메서드는 주소창의 URL을 변경하고 URL을 history entry로 추가하지만 서버로 HTTP 요청을 하지는 않는다.

pjax 방식에서 사용하는 history.pushState 메서드는 주소창의 url을 변경하지만 HTTP 요청을 서버로 전송하지는 않는다. 따라서 페이지가 갱신되지 않는다. 하지만 페이지마다 고유의 URL이 존재하므로 history 관리에 아무런 문제가 없다. 또한 hash를 사용하지 않으므로 SEO에도 문제가 없다.

***

## 결론

<img width="702" alt="스크린샷 2022-03-22 오전 10 29 33" src="https://user-images.githubusercontent.com/87749134/159389378-8e471e3e-7cd7-44df-83d0-04e6d297cde2.png">  

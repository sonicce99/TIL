# Next.js Redirects 공식 문서 내용정리

Redirects는 요청 경로를 다른 path로 변경하게 해줍니다.

사용하기 위해서 ```next.config.js```에 ```redirects```라는 key를 작성합니다.

```javascript
module.exports = {
  basePath: '/docs',

  async redirects() {
    return [
      {
        source: '/with-basePath', // automatically becomes /docs/with-basePath
        destination: '/another', // automatically becomes /docs/another
        permanent: false,
      },
      {
        // does not add /docs since basePath: false is set
        source: '/without-basePath',
        destination: '/another',
        basePath: false,
        permanent: false,
      },
    ]
  },
}
```

redirects는 ```source```, ```destination```, ```permanent``` property를 가지고 있는 비동기 함수입니다.

- source : 들어오는 경로 패턴.

- destination : 라우팅 하고 싶은 경로.

- permanent (boolean)

  > true 인 경우 : clients, 검색엔진에게 해당 redirects을 영원히 cache 하라고 합니다. (308 status code)

  > false 인 경우 : cache 하지 않고 일시적으로 redirects 합니다. (307 status code)


- basePath : false or undefined.

- locale : false or undefined.

- has : ```type```, ```key```, ```value``` 를 가지고 있는 object 입니다.


redirects는 pages 및 /public 파일을 포함하는 파일보다 먼저 확인됩니다.

redirects가 적용되면, 모든 query는 redirects 대상으로 전달됩니다.

```javascript
{
  source: '/old-blog/:path*',
  destination: '/blog/:path*',
  permanent: false
}
```

사용자가 ```/old-blog/post-1?hello=world``` 으로 요청하면 ```/blog/post-1?hello=world``` 로 redirects 됩니다.


### Header, Cookie, Query 매칭

헤더, 쿠키 또는 쿼리 값도 has 필드와 일치하는 경우에만 리디렉션을 실행 시키려면 ```has``` field를 사용할 수 있습니다. redirects를 적용하려면 source 와 모든 항목이 일치해야 합니다.

- type : header, cookie, query 라는 string 이여야합니다.

- key

- value (string or undefined) : 확인할 값입니다. 정의되지 않은 값들이 매치될 것입니다. (정규표현식으로 원하는 valeu 들만 조건에 맞게 할 수 있습니다.)

  >

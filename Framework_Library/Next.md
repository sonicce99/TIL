# Next.js

React 프레임워크이고 Verel 이라는 회사에서 만듬.

***

## 장점

1. 개발자가 SSR에 대한 고려를 직접 할 필요가 없다.

2. 정적 사이트를 만들 수 있다.

3. Zero Config ... 등등

***

## 설치

1. Manual Setup

```bash
$ npm install next react react-dom
```

```
// package.json

"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

- pages 폴더 생성

- pages/index.js 파일 생성하고 아래와 같은 코드 입력

```Javascript
function HomePage() {
  return <div>Welcome to Next.js!</div>
}

export default HomePage
```

2. create-next-app

```bash
npx create-next-app@latest --typescript myApp
```

***

## 라우팅 설정하기

1. static한 Routing

> pages 폴더에 있는 폴더, 파일명 순서로 라우팅 진행.

2. 다이나믹 Routing

- pages/blog/[slug].js

  > /blog/:slug


next.js에서 url에 있는 다이나믹 값 가져오는 법

```Javascript
import { useRouter } from "next/router";

export default function Blog() {
  const router = useRouter();

  const { slug } = router.query;

  return (
    <h1>blog/ {slug}</h1>
  );
}
```


❗️ 다이나믹 라우팅과 static 라우팅이 겹칠 때는 static 라우팅이 우선시 됨.

***

- getStaticProps (Static Generation)

  > 이미 모든 페이지가 작성되어 있음 (Build할 때 데이터로 작성됨)

- getStaticPaths (Static Generation)

  > 다이나믹 라우트를 사용했을 때 어떤 페이지를 내려줄지 구체화  

- getServerSideProps (Server-side Rendering)

  > 요청이 오면 그때마다 새로운 데이터를 기반으로 해서 서버에서 랜더링


## 배포하기

1. npm build (SSR 방식)

  > node 서버가 있음. 요청이 들어오면 html을 해당 요청에 맞게 만들어서 랜더링

2. next export (SSG 방식)

  > node 서버가 없이 이미 존재하는 html 파일을 랜더링

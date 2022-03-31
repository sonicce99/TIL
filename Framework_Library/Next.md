# Next.js

React 프레임워크이고 Verel 이라는 회사에서 만듬.

***

## 장점

1. pre-render (for Performance / SEO)

2. 정적 사이트를 만들 수 있다.

3. Code splitting and prefetching (link 태그로 감싸진 친구들은 미리 데이터를 가져온다.)

> 성능이 좋다.

3. Zero Config ... 등등

***

## 설치

### 1. Manual Setup

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

### 2. create-next-app

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

## SSG vs SSR

❗️ npm run dev 상태에서는 셋의 차의를 명확히 알기 어렵다. 반드시 Build해서 차이를 알아볼 것.  

### getStaticProps (Static Generation)

  > 이미 모든 페이지가 작성되어 있음 (Build할 때 데이터로 작성됨)  

  > 자바스크립트가 없어도 사용자는 페이지를 볼 수 있음.

    > ↑ Why? Build 했을 때 한번 실행해서 데이터를 가지고 오고 그 다음부터는 실행되지 않음.

```Javascript
export async function getStaticProps(context) {
  const res = await fetch("https://api...");
  const data = await res.json();

  console.log("getStaticProps"); // 콘솔이 찍히지 않음.

  return {
    props: { data }
  };
}
```

### getStaticPaths (Static Generation)

  > 다이나믹 라우트를 사용했을 때 어떤 페이지를 내려줄지 구체화  

### getServerSideProps (Server-side Rendering)

  > 요청이 오면 그때마다 새로운 데이터를 기반으로 해서 서버에서 랜더링

  > 자바스크립트가 없다면 아무것도 사용자는 볼 수 없음.

```Javascript
export async function getServerSideProps(context) {
  const res = await fetch("https://api...");
  const data = await res.json();

  console.log("getServerSideProps"); // 새로고침 할 때마다 계속 콘솔이 찍힘.

  return {
    props: { data }
  };
}
```

***

## Link

- a 태그는 항상 Link 태그로 감싸기 (Performance 차이 심함)  

왜? a태그만 쓰면 페이지가 이동되면서 기존에 있었던 요소들을 포함해서 모든 요소들을 다시 다 불러오는데 (full Refresh),

Link 태그로 감싸서 쓰면 기존에 불러와진 요소는 그대로 두고 더 필요한 요소들만 가져온다.

🌟 네이버와 같은 외부 링크로 갈 때는 Link 태그는 필요없다. 하지만 페이지 내부의 다른 라우터 요소로 이동할 때는 prefetching 기능이 있기때문에 무조건 Link 태그로 감싸자

class 이름 주고 싶으면 Link 태그에 주지 말고 a 태그에 주자    

```Javascript
import Link from "next/link"

<Link href="/api/...">
  <a>모두먼트</a>
</Link>
```

***

## Image

- Image 컴포넌트를 사용하면 그냥 <img /> 태그에 하는 것보다 같은 사이즈의 크기를 보여주더라도 용량을 훨씬 줄여줄 수 있다. (최적화를 할 수 있음)  

```Javascript
import Image from "next/image";

<Image
  src="/image/profile.jpg"
  alt="프로필"
  width={144}
  height={144}
/>
```

***

## Head

```Javascript
import Head from "next/head";

<Head>
  <title>Create Next app</title>
</Head>
```

***

## CSS styling

- style jsx는 vercel에서 만든 styled-jsx 라이브러리이다. 

```Javascript
<style jsx>

</style>
```

## 배포하기

1. npm build (SSR 방식)

  > node 서버가 있음. 요청이 들어오면 html을 해당 요청에 맞게 만들어서 랜더링

2. next export (SSG 방식)

  > node 서버가 없이 이미 존재하는 html 파일을 랜더링

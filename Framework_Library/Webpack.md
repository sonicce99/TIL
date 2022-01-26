# Webpack 개념 정리


### Webpack 이란?

- 웹 브라우저에서 웹 페이지를 프로그래밍적으로, 동적으로 제어하는 기술인 javascript를 더 잘 다루기 위한 기술.

-  여러개의 파일을 하나의 파일로 묶어주는 개발 자동화 도구

- 파일을 묶는 과정에서 여러가지 작업들이 실행되도록 작업 계획을 세워주기도 합니다.

- sass, typescript, jsx와 같은 언어들을 네이티브 언어로 컴파일 해주거나, 개발 중에 파일이 수정 되었을 때 자동으로 브라우저의 내용을 리로드 해주는 등의 작업도 할 수 있습니다.


<img width="600" alt="스크린샷 2021-10-26 오후 2 07 16" src="https://user-images.githubusercontent.com/87749134/138812475-3094b699-e744-483d-ade8-ac7b7fbe1f21.png">


<img width="600" alt="스크린샷 2021-10-26 오후 2 09 54" src="https://user-images.githubusercontent.com/87749134/138812716-03c86ae4-ff18-4d6d-b93e-8427cc78ccab.png">



### Webpack 실행하기


1. 현재 디렉토리를 nodejs의 프로젝트 폴더로 선언해야한다.

  > npm init

  - 1.1 그러면 package.json 이라는 파일이 생성이 됨. (이 프로젝트에 대한 여러가지 설명이 적혀있음)


<br>  

2. Webpack을 우리의 프로젝트 폴더에 설치하기

  > npm install -D webpack webpack-cli  // 여기서 -D 는 --save-dev의 축약형


  - 2.1 그러면 package.json 내부에 webpack 관련 무언가가 생성됨.

  - 2.2 node_modules 라는 폴더가 생기면서 webpack 폴더와 webpack-cli 폴더가 생성됨.


<br>

3. 우리의 프로젝트 폴더에 설치한 webpack를 사용하기

  > npx webpack --entry ./source/index.js --output ./public/index_bundle.js


  - 3.1 index.js 파일에 섞여있는 모든 파일들을 합쳐서 public 폴더 안에 index_bundle.js 라는 이름으로 합쳐서 만들어놔. 라는 명령  




### 설정파일 도입


기존에 Webpack을 실행할 때  

```
  npx webpack --entry ./source/index.js --output ./public/index_bundle.js
```

이라는 명령어를 사용했지만 프로젝트 단위가 크면 명령어로 처리하기 굉장히 어려워지는 경우가 있다. 이럴 경우에는 설정 파일을 만들어서 해당 파일을 실행시키면 명령어를 입력한것과 똑같은 결과를 낼 수 있다.

1. webpack.config.js 라는 파일을 생성

2. webpack.config.js 파일에 해당 코드 작성

```
  const path = require('path');
  module.exports = {
    entry: "./source/index.js",
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "index_bundle.js"
      clean: true
    }
  }
```

> 5번째 줄에서 path에는 절대경로를 입력해야한다. resolve는 첫번째 인수와 두번째 인수의 경로를 합쳐주는 역할을 한다. __dirname은 nodejs 환경에서 전역적으로 사용 할 수 있는 변수이며 현재 파일이 있는 그 경로를 지칭한다. 즉 public 이라는 폴더는 webpack.config.js 라는 폴더와 같은 경로에 있으며 public 폴더에 index_bundle.js 를 만들겠다는 의미

  >> 7번쨰 줄에 clean 은 번들러를 실행해서 어떤 파일을 만들고 나중에 webpack.config.js 파일을 수정하여 다시 bundling을 하면 기존에 있던 파일이 남아있던 상태에서 새로운 파일이 또 만들어 지는데 계속 하나의 파일로 유지하고 싶다면 clean: true 를 사용한다.


3. 터미널에 ```npx webpack --config webpack.config.js``` 라고 명령어를 치면 파일로 webpack 실행 가능.


- https://webpack.js.org/configuration/



### 모드의 종류

Webpack은 3가지의 모드가 있다.

1. none : 기본 최적화 옵션 선택 해제

2. production (default) : 배포용 모드

3. development : 개발자 모드


production 모드 같은 경우에는 bundle.js 가 상당히 지저분하다. 어짜피 배포용 모드이기 때문에 수정하지 않는다고 생각해서 이다.

하지만 development 모드 같은 경우에는 그래도 보기 좋은 편은 아니지만 훨씬 개발자를 배려하면서 정리가 된다.


##### production 모드

<img width="600" alt="스크린샷 2021-10-27 오후 9 57 37" src="https://user-images.githubusercontent.com/87749134/139070278-95f85183-6e34-437d-9b54-e90df0737d7b.png">


##### development 모드

<img width="600" alt="스크린샷 2021-10-27 오후 9 58 04" src="https://user-images.githubusercontent.com/87749134/139070281-6dc14908-5b24-4e84-bc4b-6a97903bcc35.png">




```
  const path = require('path');
  module.exports = {
    mode: "development",
    entry: "./source/index.js",
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "index_bundle.js"
    }
  }
```


## 로더 🌟🌟

*Webpack은 javascript 뿐만 아니라 css와 같은 다른 파일들도 번들링을 해준다.*

이것을 가능하게 해주는 것이 loader 이다. Webpack의 핵심이라고 할 수 있다.

기존에는 서버에서 css, javascript 등 여러 파일을 읽어와야 했지만 이제는 javascript 파일 안에 모든 css 파일을 주입해서 단 한개의 번들링된 파일만 서버에서 가져와서 동작시킬 수 있다.

CSS를 bundling 하기 위해서는


> npm install --save-dev style-loader css-loader


style-loader, css-loader 2개를 먼저 설치한다.

```
  const path = require('path');

   module.exports = {
     entry: './source/index.js',
     output: {
       filename: 'index_bundle.js',
       path: path.resolve(__dirname, 'public'),
     },
    module: {
      rules: [
        {
          test: /\.css$/i,  //정규표현식으로 .css라는 파일이 발견되면 아래와 같은 loader 를 통과시켜서 처리해라
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
   };
```

css-loader : webpack을 동작시켰을 때 확장자가 CSS인 파일을 만나면 알아서 webpack 안으로 가져오는 loader.


style-loader : css-loader를 통해 가져온 css 코드를 웹페이지 안에 style 태그로 주입시켜주는 loader

기존에는 HTML 안에

```
<link rel="stylesheet" href="./public/style.css">
```

이라는 코드를 작성시켰지만 번들링을 통해 하고 싶다면 필요없다.

index.js 에 import 시키면 된다.

> import css from "./style.css"

style.css를 css라는 변수에 담아서 사용 할 수 있다.



<img width="600" alt="스크린샷 2021-10-26 오후 4 26 25" src="https://user-images.githubusercontent.com/87749134/138828778-38b1ed84-c613-4e84-9533-fbe937756c1b.png">



해당 css 를 콘솔로 찍어보면 다음과 같이 나온다.

<img width="600" alt="스크린샷 2021-10-26 오후 4 28 36" src="https://user-images.githubusercontent.com/87749134/138829117-92f27027-6f29-4e2b-aae2-1170398e1fb7.png">

> css에 대한 내용이 javascript 형태로 webpack으로 주입.



<img width="600" alt="스크린샷 2021-10-26 오후 4 31 07" src="https://user-images.githubusercontent.com/87749134/138829490-5a05eff6-a03c-44f7-8114-65203689298b.png">

> head 파트에 style이라는 태그가 만들어졌고 거기에 우리가 주입한 css가 들어가 있다.

https://webpack.js.org/guides/asset-management/#loading-css

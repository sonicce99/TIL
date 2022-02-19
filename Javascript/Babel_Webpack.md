# Babel 과 Webpack 을 이용한 ES6 환경 구축  

크롬, 사파리, 파이어폭스와 같은 에버그린 브라우저 (Evergreen browser, 사용자의 업데이트 없이도 최신 버전으로 자동 업데이트를 수행하는 모던 브라우저) 의 ES6 지원 비율을 98%로 대부분이 ES6 를 구현한다.

하지만 IE 11 의 ES6 지원 비율은 약 11% 밖에 안된다.

따라서 최신 사양으로 작성된 코드를 구형 브라우저에서 문제 없이 동작시키기 위한 개발 환경을 구축하는 것이 필요하다.

현재 모던 브라우저에서 ES6 모듈을 사용할 수 있지만, 아래와 같은 이유로 브라우저가 지원하는 ES6 모듈 기능 보다는 Webpack 등의 번들러를 사용하는 것이 일반적이다.

- IE 를 포함한 구형 브라우저는 ES6 모듈을 지원하지 않는다.

- 브라우저의 ES6 모듈 기능을 사용하더라도 트랜스파일링이나 번들링이 필요하다.

## Babel

아래 예제는 ES6 의 화살표 함수와 ES7의 지수 연산자를 사용하고 있다.

```Javascript
[1,2,3].map(n => n**n);
```

IE 와 다른 구형 브라우저에서는 이 두가지 기능을 지원하지 않을 수 있다. Babel 을 사용하면 위 코드를 아래와 같이 ES5 이하의 버전으로 변환할 수 있다.

```Javascript
[1,2,3].map(function (n) {
  return Math.pow(n,n);
});
```

이처럼 Babel은 최신 사양의 자바스크립트 코드를 IE나 구형 브라우저에서도 동작하는 ES5 이하의 코드로 변환 (트랜스파일링) 할 수 있다. Babel 을 사용하기 위한 개발 환경을 구축해보자.

### Babel CLI 설치

```
# 프로젝트 폴더 생성
$ mkdir es6-project && cd es6-project

# package.json 생성
$ npm init -y

# babel-core, babel-cli 설치
$ npm install --save-dev @babel/core @babel/cli
```

### .babelrc 설정 파일 작성  

Babel을 사용하려면 ```@babel/preset-env``` 을 설치해야한다. Babel 프리셋 이라고 부른다.

```
# env preset 설치
$ npm install --save-dev @babel/preset-env
```

설치가 완료 되었으면 프로젝트 루트에 .babelrc 파일을 생성하고 아래와 같이 작성한다. 지금 설치한 ```@babel/preset-env``` 를 사용하겠다는 의미이다.

```
{
  "presets": ["@babel/preset-env"]
}
```

### 트랜스 파일링

package.json 파일에 script 를 추가한다.

```
{
  "name": "es6-project",
  "version": "1.0.0",
  "scripts": {
    "build": "babel src/js -w -d dist/js"
  },
  "devDependencies": {
    "@babel/cli": "^7.7.0",
    "@babel/core": "^7.7.2",
    "@babel/preset-env": "^7.7.1"
  }
}
```

위 npm script는 src/js 폴더(타깃 폴더)에 있는 모든 ES6+ 파일들을 트랜스파일링한 후, 그 결과물을 dist/js 폴더에 저장한다. 사용한 옵션의 의미는 아래와 같다.  

-w : 타깃 폴더에 있는 모든 파일들의 변경을 감지하여 자동으로 트랜스파일한다. (--watch 옵션의 축약형)

-d : 트랜스파일링된 결과물이 저장될 폴더를 지정한다. (--out-dir 옵션의 축약형)

### Babel 플러그인

```
$ npm install --save-dev @babel/plugin-proposal-class-properties
```

설치한 플러그인은 .babelrc 파일에 추가해 주어야 한다.

```
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

***

## Webpack

Webpack은 의존 관계에 있는 모듈들을 하나의 자바스크립트 파일로 번들링하는 모듈 번들러이다.
Webpack을 사용하면 의존 모듈이 하나의 파일로 번들링되므로 별도의 모듈 로더가 필요없다. 그리고 다수의 자바스크립트 파일을 하나의 파일로 번들링하므로 html 파일에서 script태그로 다수의 자바스크립트 파일을 로드해야하는 번거로움도 사라진다.

### Webpack 설치

```
$ npm install --save-dev webpack webpack-cli
```

### babel-loader

Webpack이 모듈을 번들링할 때 Babel을 사용하여 ES6 코드를 ES5로 트랜스파일링하도록 babel-loader를 설치한다.

```
$ npm install --save-dev babel-loader
```

### webpack.config.js

```
const path = require('path');

module.exports = {
  // enntry file
  entry: './src/js/main.js',
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development'
};
```

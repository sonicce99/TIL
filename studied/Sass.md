# Sass

Sass는 CSS pre-processor로서 CSS의 한계와 단점을 보완하여 보다 가독성이 높고 코드의 재사용에 유리한 CSS를 생성하기 위한 CSS의 확장이다.

## Sass의 장점

1. CSS보다 심플한 표기법으로 CSS를 구조화하여 표현할 수 있다.

2. CSS에는 존재하지 않는 변수, Mixin 등의 강력한 기능을 활용하여 CSS 유지보수 편의성을 큰 폭으로 향상시킬 수 있다.

## 설치

브라우저는 Sass의 문법을 알지 못하기 때문에 Sass(.scss) 파일을 css 파일로 트랜스파일링(컴파일)하여야 한다. 따라서 Sass 환경의 설치가 필요하다.  

```javascript
npm install -g sass
```

## 트랜스파일링

sass-project 디렉터리를 생성하고 트랜스파일링할 foo.scss 파일을 아래와 같이 생성하자.

```CSS
$site_max_width: 960px;
$font_color: #333;
$link_color: #00c;
$font_family: Arial, sans-serif;
$font_size: 16px;
$line_height: percentage(20px / $font_size);

body {
  color: $font_color;

  // Property Nesting
  font: {
    size: $font_size;
    family: $font_family;
  }

  line-height: $line_height;
}

#main {
  width: 100%;
  max-width: $site_max_width;
}
```

트랜스파일링할 SCSS 파일의 경로와 트랜스파일링 후 생성될 css 파일의 경로를 지정한다.

```
$ cd sass-project

// foo.scss를 트랜스파일링해서 foo.css를 생성
$ sass foo.scss:foo.css
```

foo.scss 파일이 드랜스파일링되어 다음과 같이 foo.css 파일이 생성된다.

```CSS
body {
  color: #333;
  font-size: 16px;
  font-family: Arial, sans-serif;
  line-height: 125%;
}

#main {
  width: 100%;
  max-width: 960px;
}

/*# sourceMappingURL=foo.css.map */
```

특정 디렉터리 내의 모든 scss 파일을 css 파일로 일괄 트랜스파일링해서 지정한 디렉터리에 저장하려면 다음과 같이 인풋 디렉터리와 아웃풋 디렉터리를 지정한다.

```
## sass input-directory-path:output-directory-path
$ sass src/sass:dist/css
```

npm scripts를 사용하면 매번 긴 명령어를 입력하지 않고 좀 더 간단히 명령어를 사용할 수 있다.
프로젝트 디럭터리에 아직 package.json이 없다면 다음 명령으로 package.json을 생성한다.


```
$ cd sass-project
$ npm init -y
```

생성된 package.json을 다음과 같이 수정한다.

```
{
  "name": "sass-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build:sass": "sass src/sass:dist/css"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

이제 다음 명령으로 좀 더 간단히 트랜스파일링할 수 있다.

```
$ npm run build:sass
```

## Style

scss 파일을 트랜스파일링하여 css 파일을 생성할 때 2가지 스타일 중 하나를 선택할 수 있다.

1. expanded

- 표준적인 스타일의 css 파일이 생성된다. 기본값이다.

```
$ sass --style expanded src/sass:dist/css
# 위와 같은 결과가 만들어진다.
$ sass src/sass:dist/css
```

2. compressed

- 가능한 빈공간이 없는 압축된 스타일의 css 파일이 생성된다.

```
$ sass --style compressed src/sass:dist/css
```

## watch

watch 옵션은 scss 파일의 변경을 감지하여 변경될 때마다 scss 파일을 트랜스파일링하여 css 파일을 자동 업데이트한다.

```
## watch src/sass -> dist/css
$ sass --watch src/sass:dist/css
```

## Sass vs SCSS

Sass는 SASS 표기법(.sass)과 SCSS 표기법(.scss)이 있다. 이전 버전에서는 SASS 표기법이 기본 표기법이었으나 Sass 3.0부터 CSS 친화적인 SCSS（Sassy CSS） 표기법이 기본 표기법이 되었다.

SASS 표기법은 보다 코딩을 간략화할 수 있는 장점이 있지만 CSS 친화적인 SCSS 표기법를 사용하는 경우가 더 많으므로 본 Post에서는 SCSS 표기법을 기준으로 한다.

***

## 변수

Sass에서는 변수를 사용할 수 있다. 문자열, 숫자, 컬러(#aa443f) 등을 사전에 변수에 저장하고 필요할 때 불러 사용할 수 있다.

변수명은 ```$``` 로 시작한다.

```
//Sass

$site_max_width: 960px;
$font_color: #333;
$link_color: #00c;
$font_family: Arial, sans-serif;
$font_size: 16px;
$line_height: percentage(20px / $font_size);

body {
  color: $font_color;

  // Property Nesting
  font: {
    size: $font_size;
    family: $font_family;
  }

  line-height: $line_height;
}

#main {
  width: 100%;
  max-width: $site_max_width;
}
```

```css
// CSS

body {
  color: #333;
  font-size: 16px;
  font-family: Arial, sans-serif;
  line-height: 125%;
}

#main {
  width: 100%;
  max-width: 960px;
}
```

## 변수의 Scope

변수에는 유효범위(scope)가 존재한다. 코드 블록 내에서 선언된 변수는 지역변수가 된다. 지역변수의 유효범위는 자신이 속한 코드 블록과 하위 코드 블록이다.

```
// scss

$width: 960px; // 전역 변수

header {
  width: $width;
  margin: 0 auto;
}

#main {
  $color: #333; // 지역 변수
  width: $width;
  margin: 20px auto;
  section {
    p {
      color: $color;

      a:link {
        color: $color;
      }
    }
  }
}

footer {
  width: $width;
  margin: 0 auto;
  color: $color; // Error: Undefined variable: "$color".
}
```

위 예제에서 $width는 top level에 기술되었으므로 전역 변수다. 전역변수는 전역은 물론 하위의 어떤 코드 블록 내에서도 유효하다.

위 예제를 트랜스파일링하면 Undefined variable: “$color”라는 에러가 발생한다. 이는 #main에서 선언한 $color는 #main 내에서만 유효한 지역 변수이기 때문이다.

코드 블록 내에서 선언한 변수를 전역 변수로 지정하는 방법은 아래와 같다.

```
//SCSS

#main {
  $color: #333 !global; // 전역 변수
  width: $width;
  ...
```

## 연산자  

```
//SCSS

$width: 100px;

#foo {
  width: $width + 10; // 110px
}

#bar {
  width: $width + 10in; // 1060px
}
```

변수 $width의 값 100px에 10 또는 10em과 같이 다른 단위의 값을 연산하여도 에러없이 연산이 수행된다. 이때 연산자의 왼쪽 값을 기준으로 단위가 설정된다.

$width에 10em을 더하면 어떻게 될까?

```
// SCSS

$width: 100px;

#foo {
  width: $width + 10em; // 100px + 10em => Error: Incompatible units em and px.
}
```

트랜스파일링 결과 Error: Incompatible units em and px.이라는 에러를 출력한다.
Sass 연산은 대상을 변환하여 연산할 수 없는 경우 에러를 출력한다.
%, em, rem, vh, vw, vmin, vmax과 같이 상대적인 값을 Sass는 알지 못한다. 상대적인 값의 결과값은 브라우저만이 알 수 있기 때문이다.
따라서 상대적인 값을 갖는 단위의 연산은 동일한 단위를 갖는 값과의 연산만이 유효하다.

calc 함수(IE9 이상 사용가능)를 사용하면 이런 문제를 해결할 수 있다.

```
// SCSS

#foo {
  width: calc(25% - 5px);
}
```

## Ampersand(&)

- ```&``` 는 부모요소를 참조하는 셀렉터이다.

```
// SCSS

a {
  color: #ccc;

  &.home {
    color: #f0f;
  }

  &:hover {
    text-decoration: none;
  }

  // & > span (X)
  > span {
    color: blue;
  }

  span {
    color: red;
  }
}
```

***

## Nesting

Nesting은 Sass의 유용한 확장 기능으로 선언을 중첩(nesting)하는 것이다.

```
// css

#navbar {
  width: 80%;
  height: 23px;
}

#navbar ul {
  list-style-type: none;
}

#navbar li {
  float: left;
}

#navbar li a {
  font-weight: bold;
}
```

```
// SCSS

#navbar {
  width: 80%;
  height: 23px;

  ul {
    list-style-type: none;
  }

  li {
    float: left;
    a {
      font-weight: bold;
    }
  }
}
```

nesting은 프로퍼티에도 사용할 수 있다.

```
// SCSS

.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```

위 코드의 트랜스파일링 결과는 아래와 같다.

```
// CSS

.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold;
}
```

## @import

1개의 CSS 파일에 모든 스타일을 기술하면 유지보수하기 힘들고 가독성이 좋지 않다. 기능에 따라 CSS 파일을 분리하면 재사용 및 유지보수 측면에서 유리하다. Sass는 @import directive를 사용하여 분리된 stylesheet 파일을 import할 수 있다.  


```
// SCSS

@import "foo.scss";

// 확장자는 생략 가능하다
@import "foo";

// 여러 개의 파일을 한번에 임포트할 수 있다.
@import "rounded-corners", "text-shadow";

// 변수를 사용해 문자열을 생성하여 임포트할 수도 있다.
$family: "Open+Sans";
@import url("http://fonts.googleapis.com/css?family=#{$family}");
```

여러 개의 파일로 분할하는 것 또는 분할된 파일을 partial이라 하며 partial된 Sass 파일명의 선두에는 underscore(_)를 붙인다. (_reset.scss, _module.scss, _print.scss)

예를 들어, “_foo.scss”라는 partial된 Sass 파일이 있고 이 파일을 import하는 경우 아래와 같이 기술한다. 파일명 선두의 _와 확장자는 생략할 수 있다.

```
// scss

@import "foo";
```

partial된 Sass 파일명 선두에 붙인 _의 의미는 import는 수행하되 CSS로의 트랜스파일링은 수행하지 말라는 의미를 갖는다. 따라서 partial은 import시에는 CSS 파일로 트랜스파일링되지 않기 때문에 최종적으로 CSS로 트랜스파일링을 수행할 Sass 파일에서 import한다.

```
// SCSS
// partial/_vars.scss

$width: 960px;
```

```
// SCSS
// partial/_header.scss

#header {
  width: $width;
}
```

```
// SCSS
// partial/_sidebar.scss

#sidebar {
  width: $width;
}
```

```
// SCSS
// style.scss

@import "partial/vars";
@import "partial/header";
@import "partial/sidebar";
```

_vars.scss에는 변수가 선언되어 있으므로 partial된 _vars.scss, _header.scss, _sidebar.scss를 import가 수행되어 하나의 파일이 되기 이전에 트랜스파일링을 실행하면 에러가 발생한다. 즉, partial된 Sass 파일명 선두에 붙인 _을 제거하면 에러가 발생한다. 따라서 partial된 Sass 파일명 선두에는 반드시 _를 붙여서 import 시에는 partial이 CSS 파일로 트랜스파일링되지 않고 import가 완료된 이후, CSS로 트랜스파일링을 수행도록 한다.

> 최신 버전에서는 _을 붙이지 않아도 에러가 발생하지 않는다. @import 대신 @use를 사용하는 방법도 있다. 이에 대해서는 SCSS에 새로 추가된 Module System (@use, @forward)을 참고하기 바란다.

## extend

> @extend를 사용하면 트랜스파일링 후 자신의 셀렉터가 어디에 첨부될 것인지 예상하기 어렵고, 예상치 못했던 부작용이 발생할 수 있다. 따라서 @extend의 사용은 가급적 자제하고 Mixin은 사용하는 것을 추천한다.

## 조건과 반복  

### if()

삼항연산자와 비슷하다  

```
// SCSS

$type: ocean;

p {
  color: if($type == ocean, blue, black); // color: blue;
}
```

### @if... @else

```
// SCSS

$type: monster;

p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

트랜스파일링 결과는 아래와 같다.

```
// CSS

p {
  color: green;
}
```

### @for

```
// SCSS

@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```

트랜스파일링 결과는 아래와 같다.

```
.item-1 {
  width: 2em;
}
.item-2 {
  width: 4em;
}
.item-3 {
  width: 6em;
}
```

### @each

```
// SCSS

// List
@each $animal in puma, sea-slug, egret, salamander {

  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}

// Map
// $header: h1, $size: 2em
// $header: h2, $size: 1.5em
// $header: h3, $size: 1.2em
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}
```

트랜스파일링 결과는 아래와 같다.

```
.puma-icon {
  background-image: url("/images/puma.png");
}

.sea-slug-icon {
  background-image: url("/images/sea-slug.png");
}

.egret-icon {
  background-image: url("/images/egret.png");
}

.salamander-icon {
  background-image: url("/images/salamander.png");
}

h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.5em;
}

h3 {
  font-size: 1.2em;
}
```

### @while

```
// SCSS

$i: 6;

@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

트랜스파일링 결과는 아래와 같다.

```
// CSS

.item-6 {
  width: 12em;
}

.item-4 {
  width: 8em;
}

.item-2 {
  width: 4em;
}
```

## Mixin

Mixin은 Sass의 매우 유용한 기능으로 중복 기술을 방지하기 위해 사용 빈도가 높은 마크업을 사전에 정의하여 필요할 때에 불러 사용하는 방법이다.

사용법은 매우 간단하다. @mixin 선언하고 @include로 불러들인다.

```
// SCSS

// 지름이 50px인 원
@mixin circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

// 지름이 50px인 원을 위한 mixin을 include한 후 배경을 추가 지정
.box {
  @include circle;

  background: #f00;
}
```

트랜스파일링 결과는 아래와 같다. 배경이 red이고 지름이 50px인 원을 나타낸다.

```
// css

.box {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f00;
}
```

@extend와 차이가 없어 보이나 Mixin은 함수와 같이 매개 변수를 사용할 수 있다.

```
// scss

@mixin circle($size) {
  width: $size;
  height: $size * 2;
  border-radius: 50%;
}

.box {
  @include circle(100px);

  background: #f00;
}
```

트랜스파일링 결과는 아래와 같다.

```
// CSS

.box {
  width: 100px;
  height: 200px;
  border-radius: 50%;
  background: #f00;
}
```

매개 변수의 초기값을 설정할 수도 있다.

```
// SCSS

@mixin circle($size: 10px) {
  width: $size;
  height: $size * 2;
  border-radius: 50%;
}

.box {
  // 인수가 전달되지 않으면 초기값을 사용한다.
  @include circle();
  background: #f00;
}
```

트랜스파일링 결과는 아래와 같다.

```
// CSS

.box {
  width: 10px;
  height: 20px;
  border-radius: 50%;
  background: #f00;
}
```

## Function

Function은 mixin과 유사하나 반환값에 차이가 있다.

- mixin : style markup을 반환

- function : @return directive를 통하여 값을 반환


```
// SCSS

$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar { width: grid-width(5); }  // width: 240px;
```

***

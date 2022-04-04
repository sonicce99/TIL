# Typescript

## Typescript와 Javascript

- Typescript : Static Types (Type Annotation)


- Javascript : Dynamic Types  

***

## Tuple

- 배열인데 값의 타입이 정해져있는 배열이 있을 수 있음. 그럴 때 튜플을 사용함.  

> 길이가 정해져있고 앞, 뒤의 타입이 명확해야함.

```Javascript
let x: [string, number] = ["good", 39];  

x = ["hello", 39]; ⭕️

x = [39, "hello"]; ❌

x = ["hello", 39, 40]; ❌
```

***

## Options

### noImplicityAny

타입을 명시적으로 지정하지 않은 경우, 타입스크립트가 추론 중 "any" 라고 판단하게 되면, 컴파일 에러 발생시켜 명시적으로 any든 뭐든 지정하게 유도함.

### strictNullChecks

모든 타입에 자동으로 포함되어 있는 "null", "undefined"를 제거해줍니다.  

  > number 타입은 undefined을 포함하기 때문에 이 옵션을 키면 둘을 분리 시켜줌.  

### noImplicitReturns

함수 내에서 모든 코드가 값을 리턴하지 않으면, 컴파일 에러 발생 시킴.

```Javascript
function f5(a: number) {
  if(a > 0) {
    return a * 38;
  }
}

// ❌ if 다음에 무슨 말이 없어서 Error 이걸 하지 않으면 else 부분에서 타입이 변경 될 수 있기 때문에..  
```

***

## Typescript Compiler

<img src="https://user-images.githubusercontent.com/87749134/161516562-02a13f35-3e3e-451e-8d15-6795b34ce5ea.png" alt="image" width="250px" />

```Javascript
// tsconfig.json

"files": {},
"extends": {},
"compileOptions": {}

...
```

### compileOnSave

- true / false (default false)  

### extends

- tsconfig.json 도 상속 받아서 사용할 수 있음.  

```
"extends": "./base.json"
```

- ↓ ex) 타입스크립트에서 제공하는 여러 설정들을 참조할 수 있음.

```bash
$ npm install --save-dev @tsconfig/deno
```

```
"extends": "@tsconfig/deno/tsconfig.json"  
```

### compileOptions



### files

- files 안에 파일명이 적혀 있으면 해당 파일을 컴파일함.


### include

- include 안에 파일명이 적혀 있으면 해당 파일을 컴파일함.   

### exclude

- exclude 안에 파일명이 적혀 있으면 해당 파일을 컴파일 하지 않음. (includ 안에 있는 파일명을 제외시키고 files안에 있는 파일명은 제외시키지 않음.)  

- 🌟 설정하지 않으면 4가지 (node_modules, bower_components, jspm_packages, <outDir>) 을 default로 제외한다.  

- <outDir> 은 항상 제외한다. (include에 있어도)  

###references

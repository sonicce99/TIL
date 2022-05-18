# Typescript

## 실행

- tsconfig.json 파일 생성하기  

```bash
$ npx tsc --init
```

- ts 파일을 js 파일로 컴파일 하기

```bash
$ npx tsc  
```

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

### noImplicitThis

첫번째 매개변수 자리에 this를 놓고, this에 대한 타입을 어떤 것이라도 표현하지 않으면 noImplicityAny 오류를 발생시킴.  

### strictNullChecks

모든 타입에 자동으로 포함되어 있는 "null", "undefined"를 제거해줍니다.  

  > number 타입은 undefined을 포함하기 때문에 이 옵션을 키면 둘을 분리 시켜줌.

모든 타입은 null, undefined 값을 가질 수 있습니다. 따라서 꼭 체크해줘야 한다. 가지려면 union type을 이용해서 직접 명시해야 합니다.  

### strictFunctionTypes



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

#### @types

- TypeScript 2.0 부터 사용 가능해진 내장 type definition 시스템

> 아무 설정 안할 시 node_modules/@types 라는 모든 경로를 찾아서 사용

- ```typeRoots``` 를 사용하면 배열 안에 들어있는 경로들 안에서만 가져옵니다.

- ```types``` 를 사용하면 배열안의 모듈 or ./node_modules/@types 안의 모듈 이름에서 찾아옵니다.

> 빈 배열을 넣으면 이 시스템을 사용하지 않겠다는 것.

- ```typeRoots``` ```types``` 를 같이 사용하지 않습니다.  

#### target

- 빌드의 결과물을 어떤 버전으로 할 것인지 설정함.

- target은 default 값이 ES3로 설정되어 있음.  

#### lib  

- 기본 type definition 라이브러리를 어떤 것을 사용할 것인지 설정함.  

- lib를 따로 지정하지 않을 때,

  > target 이 'es3' 이면, default로 lib.d.ts를 사용합니다.

  > target 이 'es5' 이면, default로 dom, es5, scripthost를 사용합니다.

  > target 이 'es6' 이면, default로 dom, es6, scripthost, dom.iterable를 사용합니다.

- lib를 지정하면 그 lib 배열로만 라이브러리를 사용합니다.  


#### outDir

- 컴파일 하고 난 후에 폴더 명 설정.  

#### rootDir  

- 프로젝트에서 어느 파일을 root로 잡고 컴파일 할지 설정하는 옵션.  


### files

- files 안에 파일명이 적혀 있으면 해당 파일을 컴파일함.


### include

- include 안에 파일명이 적혀 있으면 해당 파일을 컴파일함.   

### exclude

- exclude 안에 파일명이 적혀 있으면 해당 파일을 컴파일 하지 않음. (includ 안에 있는 파일명을 제외시키고 files안에 있는 파일명은 제외시키지 않음.)  

- 🌟 설정하지 않으면 4가지 (node_modules, bower_components, jspm_packages, <outDir>) 을 default로 제외한다.  

- outDir 은 항상 제외한다. (include에 있어도)  

### references

***

## Interface

ts 파일을 js 파일로 컴파일 하기 위해 Interface가 필요하고 실제 js 파일에 Interface 코드가 들어가지는 않는다.  

### Indexable type

- [index...] 를 쓰면 어떤 내용의 key값이라도 들어올 수 있음.  

```TypeScript
interface Person3 {
  name: string;
  age?: number;
  [index: string] : any;
}

function hello(person: Person3):void {
  console.log("하이");
}

const person1: Person3 = {
  name: "Mark",
  age: 39
}

const person2: Person3 =
{
  name: "Anna",
  systers: ["Sung", "Chan"]
};

const person3: Person3 = {
  name: "치킨",
  father: person1,
  mother: person2
};
```

### function in interface

- interface 안에 함수가 들어 갈 수 있음.  

```Typescript
interface Person {
  name: string;
  age: number;
  hello(): void;
}

// ↓ 방법 1

const person1: Person = {
  name: "Mark",
  age: 39,
  hello: function (): void {
    console.log(`안녕하세요! ${this.name} 입니다.`)
  }
}

// ↓ 방법 2

const person1: Person = {
  name: "Mark",
  age: 39,
  hello(): void {
    console.log(`안녕하세요! ${this.name} 입니다.`)
  }
}
```

### class implements interface

- interface 로부터 class를 implements 할 수 있음.

```Typescript
interface Iperson1 {
  name: string;
  age?: number;
  hello(): void;
}

class Person implements Iperson1 {
  name: string;
  age?: number | undefined;

  constructor(name: string) {
    this.name = name;
  }

  hello(): void {
    console.log(`안녕하세요! ${this.name} 입니다.`)
  }
}
```

### interface 상속

 ```Typescript
 interface Person {
   name: string;
   age?: number;
 }

 interface Korean extends Person {
   city: string;
 }

 const dongsu: Korean = {
   name: "이동수",
   city: "Incheon"
 }
 ```

### function interface

```Typescript
interface Person {
  (name: string, age?: number) : void;
}

const person : Person = function (name: string) {
  console.log(`안녕하세요! ${name} 입니다.`);
}

person("Mark", 39);
```

### type alias vs interface

- function

```Typescript
interface Person {
  (name: string, age?: number) : void;
}

// or

type Person = (food: string) => void;
```

- array

```Typescript
interface List {
  [index: number]: string;
}

type List = string[];
```

- intersection

```Typescript
interface ErrorHandling {
  success: boolean;
  error?: {message: string};
}

interface ArtistsData {
  artists: {name: string}[]
};

type ArtistsResopnseType = ArtistsData & ErrorHandling;

interface IArtistsResponse extends ArtistsData, ErrorHandling {}
```

- union types

```Typescript
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim() : void;
  layEggs(): void;
}

type PetType = Bird | Fish;

❌ interface IPet extends PetType {} // Error 유니온 타입은 상속 할 수 없음.

❌ class Pet implements PetType {} // Error 유니온 타입은 class로 implements 할 수 없음.  
```

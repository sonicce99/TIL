# 코어 자바스크립트


## 목차

1. [데이터 타입](#1장-데이터-타입)
2. [실행 컨텍스트](#2장-실행-컨텍스트)
3. [this](#3장-this)
4. [콜백 함수](#4장-콜백-함수)
5. [클로저](#5장-클로저)
6. [프로토타입](#6장-프로토타입)
7. [클래스](#7장-클래스)

***

## 1장 데이터 타입

***


## 2장 실행 컨텍스트

어떤 실행 컨텍스트가  활성화 될 때 자바스크립트 엔진은 해당 컨텍스트에 관련된 코드들을 실행하는데 필요한 환경 정보들을 수집해서 실행 컨텍스트 객체에 저장합니다. 이 객체는 자바스크립트 엔진이 활용할 목적으로 생성 할 뿐 개발자가 코드를 통해 확인 할 수는 없습니다.

여기에 담기는 정보들은 다음과 같습니다.

- VariableEnvironment : 현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보. 선언 시점의 LexicalEnvironment 의 스냅샷, 변경사항은 반영되지 않음.

- LexicalEnvironment : 처음에는 VariableEnvironment 와 같지만 변경 사항이 실시간으로 반영됨.

- ThisBinding : this 식별자가 봐라봐야 할 대상 객체

#### VariableEnvironment

실행 컨텍스트를 생성할 때 VariableEnvironment에 정보를 먼저 담은 다음, 이를 그대로 복사해서 LexicalEnvironment 를 만들고, 이후에는 LexicalEnvironment를 주로 활용한다. VariableEnvironment 와 LexicalEnvironment 의 내부는 ```environmentRecord``` 와 ```outerEnvironmentReference``` 로 구성되어 있다. 초기화 과정 중에는 사실상 완전히 동일하고 이 후 코드 진행에 따라 서로 달라지게 될 것이므로 자세한 내용은 LexicalEnvironment 를 통해서 살펴보자.

#### LexicalEnvironment (사전적인 환경...)

예를 들어, 백과사전에서 바나나를 검색하면 *칼로리가 가장 높고 당질이 많은 알칼리성 식품으로 ...* 와 같은 내용이 등장한다. 이런 느낌으로 "현재 컨텍스트에는 a,b,c 같은 식별자들이 있고 D를 참조하도록 구성되어 있다." 라는 , 컨텍스트를 구성하는 환경 정보들을 사전에 접하는 느낌으로 모아놓은 것이다.

##### environmentRecord 와 호이스팅

environmentRecord 에는 현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장됩니다. *컨텍스트 내부 전체를 처음부터 쭉 훑어 나가며 순서대로 수집합니다.* 즉 코드가 실행 되기 전임에도 불구하고 자바스크립트 엔진은 이미 해당 환경에 속한 코드의 변수명을 모두 알고 있게 됩니다.

자바스크립트 엔진이 실제로 끌어올리지는 않지만 편의상 끌어올렸다고 간주하자는 뜻인거죠.


##### 스코프, 스코프 체인, outerEnvironmentReference

- 스코프 : 전역변수, 지역변수 같은 범위를 말함.

- 스코프체인 : "식별자의 유효범위" 를 안에서 바깥으로 차례대로 검색해 나가는 것

- outerEnvironmentReference : 바로 직전 컨텍스트의 LexicalEnvironment 정보를 참조함.


***


## 3장 this

자바스크립트에서 this 는 기본적으로 실행컨텍스트가 생성될 때 함께 결정됩니다. 전역공간에서 this 는 전역 객체를 가리킵니다.
전역  객체는 자바스크립트 런타임 환경에 따라 다른 이름과 정보를 가지고 있습니다.

- 브라우저 환경 : window

- Node.js 환경 : global

#### 함수 vs 메서드

- 이 둘을 구분하는 유일한 차이는 독립성에 있습니다. 함수는 그 자체로 독립적인 기능을 수행하는 반면, 메서드는 자신을 호출한 대상 객체에 관한 동작을 수행합니다. 자바스크립트는 상황별로 this 키워드에 다른 값을 부여하게 함으로써 이를 구현했습니다.

```Javascript
var func  = function (x) {
  console.log(this,x);
};
func(1); // Window { ... }

var obj = {
  method: func
};
obj.method(2); // { method: f }
```

그렇다면 함수로서의 호출과 메서드로서의 호출을 어떻게 구분할까요? 함수 앞에 점(.) 이 있는지 여부만으로 간단하게 구분할 수 있습니다. (대괄호 표기법에 따른 경우에도 메서드로서 호출한 것입니다.)

#### this 를 바인딩 하지 않는 함수  

ES6 에서는 함수 내부에서 this 가 전역객체를 바라보는 문제를 보완하고자, this 를 바인딩하지 않는 화살표 함수를 새로 도입했습니다. 즉 이 함수 내부에는 this 가 아예 없으며, 접근하고자 하면 스코프체인상 가장 가까운 this에 접근하게 됩니다.  

```Javascript
obj = {
    outer : function () {
        console.log(this); // { outer3: ƒ }
        var innerFunc = () => {
            console.log(this); // { outer3: ƒ }
        };
        innerFunc();
    }
};

obj.outer();
```

#### 생성자 함수 내부에서의 this

자바스크립트는 함수에 생성자로서의 역할을 함께 부여했습니다. new 명령어와 함께 함수를 호출하면 해당 함수가 생성자로서 동작하게 됩니다. 그리고 어떤 함수가 생성자 함수로서 호출된 경우 내부에서의 this 는 곧 새로 만들 구체적인 인스턴스 자신이 됩니다.

```Javascript
var Cat = function(name,age) {
  this.bark = "야옹";
  this.name = name;
  this.age = age;
};

var choco = new Cat("초코", 7);
var nabi = new Cat("나비", 5);

console.log(choco, nabi);

// Cat { bark : "야옹", name: "초코", age: 7}
// Cat { bark : "야옹", name: "나비", age: 5}
```

#### 생성자 함수 내부에서 다른 생성자 호출

```Javascript
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}

function Student(name, gender, school) {
  Person.call(this, name, gender);
  this.school = school;
}

function Employee(name, gender, company) {
  Person.apply(this,[name,gender]);
  this.company = company;
}

var ds = new Employee("동수", "male", "구글");
```

***

## 4장 콜백 함수

콜백함수의 제어권을 넘겨받은 코드는 콜백함수 호출 시점에 대한 제어권을 가집니다.

Array.prototype 에 담긴 map 메서드는 다음과 같은 구조로 이뤄져 있습니다.


```Javascript
Array.prototype.map(callback[, thisArg])

callback: function(currentValue, index, origin);
```

왜 map 의 인자로 콜백함수 일까?

=> 원하는 시간에 알람이 울리는 결과를 얻기 위해서는 시계가 정한 규칙, 즉 "알람용 침이 원하는 시간을 가리키도록 정하고 알람 스위치를 ON 으로 해야한다" 라는 규칙을 따라야만 합니다.

마찬가지로 map 메서드를 호출해서 원하는 배열을 얻으려면 map 메서드에 정의된 규칙에 따라서 함수를 작성해야 합니다.

이처럼 콜백 함수의 제어권을 넘겨받은 코드는 콜백함수를 호출할 때 인자에 어떤 값들을 어떤 순서로 넘길 것인지에 대한 제어권을 가집니다.

#### 콜백함수는 함수다

콜백 함수는 함수입니다. 콜백 함수로 어떤 객체의 메서드를 전달 하더라도 그 메서드는 메서드가 아닌 함수로서 호출됩니다.

```Javascript
var obj = {
  vals : [1,2,3],
  logValues : function (v,i) {
    console.log(this,v,i);
  }
};
obj.logValues(1,2); // { vals: [1,2,3], logValues: f } 1 2
[4,5,6].forEach(obj.logValues); // Window { ... } 4 0
```



***


## 5장 클로저

함수와 렉시컬 환경의 조합.
함수가 생성될 당시의 외부변수를 기억, 생성 이후에도 계속 접근 가능.  

클로저는 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상.

```Javascript
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
};
var outer2 = outer();

console.log(outer2);
console.log(outer2);
```

#### 클로저의 활용 사례

- 콜백함수 내부에서 외부 데이터를 사용하고자 할 때

- 접근 권한 제어(정보은닉)  

- 부분 적용 함수  

***


## 6장 프로토타입

***


## 7장 클래스

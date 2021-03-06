# Class 내용정리  

## Class vs object

- Class 라는 틀로 찍어서 만들어 낸 것이 object

***  

## Class, object 생성

```javascript
class person {
  name;
  age;
  speak();
}
```

이렇게 ```fields (속성)``` 이 있고 ```methods (행동)``` 가 있다.

↓ Class 생성

```javascript
class Person {
  constructor(name, age) {
    //fields
    this.name = name;
    this.age = age;
  }

  speak() {
    console.log(`${this.name} : hello!`);
  }
}
```

↓ object 생성

```javascript
const dongsu = new Person("dongsu",20);

console.log(dongsu.name);
console.log(dongsu.age);
dongsu.speak();
```

***

## Getter & Setter

예를 들어 Person 의 Class 에는 나이를 받을 수 있는데 나이가 -1 인 경우는 없다. 그래서 사용자는 잘 못 입력하더라도 컴퓨터는 최소한 0이라고 수정은 해주어야 한다. 그래서 이때 필요한 것이 Getter, Setter 이다.

```javascript
class User {
  constructor(firstName,lastName,age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}

const user1 = new User("Dongsu","Lee",-5); // 이렇게 하면 내 나이는 -5??? ❌
```

↓ Getter & Setter 를 사용한 올바른 예시

- 필요시 해당 링크의 12분 부터 볼 것 : https://www.youtube.com/watch?v=_DLhUBWsRtw

```javascript
class User {
  constructor(firstName,lastName,age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  get age() {
    return this._age
  }

  set age(value) {
    this._age = value < 0 ? 0 :  value;
  }
}

const user1 = new User("Dongsu","Lee",-5);
console.log(user1.age); // 0
```

***

## 상속 & 다양성 (Extends)

🌟 상속을 받았기 때문에 Shape 클래스만 수정하면 객체 모두 수정되는 효과  

```javascript
class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    console.log(this.color);
  }

  getArea() {
    console.log(this.width * this.height);
  }
}


class Rectangle extends Shape {} // 이렇게 하면 Shape 클래스에 있는걸 Rectangle이 쓸 수 있음.

const rectangle = new Rectangle(20,20,"blue");
rectangle.draw(); // blue
rectangle.getArea(); //400

////////////////////////////////////////////

class Triangle extends Shape {}

const triangle = new Triangle(20,20,"red");
triangle.draw(); // "red"
triangle.getArea(); // 400 ? ❌ 삼갹형의 넓이는 400이 아닌 200 이 되야한다.
```

triangle 같은 경우에는 getArea 함수를 Overriding (재정의) 를 해야한다.  

❗️ Overriding 하면 부모 요소의 같은 이름 함수는 적용되지 않는다.

```javascript
class Triangle extends Shape {
  getArea() {
    console.log((this.width * this.height) / 2);
  }
}

const triangle = new Triangle(20,20,"red");
triangle.getArea(); // 200 => Overriding 했기 때문에 Shape 클래스의 getArea는 실행 되지 않음.

🌟 만약 재정의했던 부모요소의 함수도 쓰고 싶다면 super 키워드를 사용한다.

class Triangle extends Shape {
  draw() {
    super.draw();
    console.log("green")
  }
}
```

***

## Public fields & Private fields

```javascript
class Person {
  // constructor 를 쓰지 않고 fields 를 정의 할 수 있음. 그냥 정의하면 public, # 쓰면 private
  publicField = 2;
  #privateField = 0;
}

const dongsu = new Person();
console.log(dongsu.publicField); // 2
console.log(dongsu.privateField); // undefined
```

***

## Static

object에 상관 없이 class 에서만 접근이 가능한 field?
static 은 object 마다 값이 할당되어지는 것이 아니라 class 에서 접근이 가능하다.

쓰는 이유 : object에서 상관 없이 class 에서만 쓰므로 불필요한 메모리 할당을 막을 수 있음.  

```javascript
class Article {
  static publisher = "동수의 로그북";

  constructor(articleNumber) {
    this.articleNumber = articleNumber;
  }

  static printPublisher() {
    console.log(Article.publisher);
  }
}

const article1 = new Article(1);
const article1 = new Article(2);
console.log(article1.publisher); // undefined
console.log(Article.publisher); // 동수의 로그북
Article.printPublisher(); // 동수의 로그북
```

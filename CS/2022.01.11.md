# Vanilla Javascript 로 웹 컴포넌트 만들기

- 참조 블로그 : https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/#_1-%E1%84%8F%E1%85%A5%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%AA-%E1%84%89%E1%85%A1%E1%86%BC%E1%84%90%E1%85%A2%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5

## 1. 컴포넌트와 상태관리

### (1) 상태관리의 탄생

2012년도 만해도 javascript에 제일 중요한게 jQuery 였다.


#### jQuery

- jQuery는 빠르고 작고 기능이 풍부한 Javascript 라이브러리 이다.

- jQuery api 는 크로스 브라우징을 지원한다.

- DOM, Event, Animation 및 Ajax와 같은 작업을 훨씬 간편하게 만든다.

jQuery의 가장 큰 장점은 ```DOM API``` 라고 생각한다. jQuery는 ```DOM``` 을 쉽게 조작할 수 있도록 만들어주는 것에 더해 ```크로스 브라우징``` 과 관련된 이슈를 해결해주었다.

그런데 점점 브라우저와 Javascript 가 발전하는 과정에서 아예 *브라우저(클라이언트) 단에서 렌더링* 을 하고 *서버에서는 ```REST API``` 혹은 ```GraphQL``` 같이 브라우저 렌더링에 필요한 데이터만을 제공* 하는 형태로 기술이 변화했다.

이제 직접적으로 ```DOM``` 을 다루는 행위가 급격하게 감소했고, *```상태 (state)``` 를 기준으로 ```DOM``` 을 렌더링 하는 형태로 발전* 한 것이다. 즉 ```State``` 가 변하지 않을 경우  ```DOM``` 이 변하면 안되는 것이다.

이러한 과정 속에서 ```Client-Side Rendering``` 이라는 개념과 ```상태관리``` 라는 개념이 생기게 되었다.

```
SSR 과 CSR

SSR (Server-Side Rendering)

  1. 약 5년 전까지만 해도 ```JSP```, ```PHP```, ```ASP``` 등이 웹 개발 3대장이라고 불렸다.

  2. 위에 언급한 것들이 하는 역할이 바로 서버에서 HTML 을 만들어서 클라이언트에 넘겨주는 것, 즉 SSR 이다.

  3. 따라서 클라이언트 (브라우저) 단에서는 굳이 데이터를 깊은 단계까지, 정교하게 관리할 필요가 없었다.

CSR (Client-Side Rendering)

  1. Javascript 가 발전하면서 아예 브라우저 (클라이언트) 단에서 모든 렌더링을 처리 하려는 시도가 계속 되었고, 그렇게 ```React```, ```Angular```, ```Vue``` 같은 프레임워크 (혹은 라이브러리) 가 탄생했다.

  2. 브라우저 (클라이언트) 단에서 렌더링을 하기 위해선, 렌더링 상태를 정교하게 관리해야한다.

  3. 그래서 ```Redux``` 같은 상태관리 라이브러리 (혹은 프레임워크) 가 생겨났다.
```

### (2) 컴포넌트

Angular 가 CSR 의 시작이었다면, React는 컴포넌트 기반 개발의 시작이었다. 그리고 Angular 와 React의 장점을 모두 수용한 Vue 가 나왔다.

어쨋든 중요한 점은 *현 시점의 웹앱은 컴포넌트 단위로 설계되고 개발된다.* 는 것이다. 그리고 *컴포넌트 마다 컴포넌트를 렌더링 할 때 필요한 상태를 관리하게 되었으며* , ```Proxy``` , ```Observer Pattern``` 등을 이용하여 이를 구현한다.

***


## 2. state- setState - Render

컴포넌트의 설계의 기반이 되는 코드를 만들어보자.

### (1) 기능 구현

```HTML
<div id="app"></div>

<script>
const $app = document.querySelector('#app');

let state = {
  items: ['item1', 'item2', 'item3', 'item4']
}

const render = () => {
  const { items } = state;
  $app.innerHTML = `
    <ul>
      ${items.map(item => `<li>${item}</li>`).join('')}
    </ul>
    <button id="append">추가</button>
  `;
  document.querySelector('#append').addEventListener('click', () => {
    setState({ items: [ ...items, `item${items.length + 1}` ] })
  })
}

const setState = (newState) => {
  state = newState;
  render();
}

render();
</script>
```

이 코드의 핵심은 다음과 같다.

- ```state``` 가 변경되면 ```render``` 를 실행한다.

- ```state``` 는 ```setState``` 로만 변경해야 한다.

🌟 render 는 1번만 실행되고 addEventListener 가 동작하는지 아닌지 계속 기다리고 있다. 버튼이 눌리면 setState 가 동작하고 setState 에 있는 render() 함수가 또 동작하여 상태를 바꾼다.

### (2) 추상화



```javascript
<div id="app"></div>

<script>
  class Component {
    state;
    constructor($target) {
      this.$target = $target;
      this.setup();
      this.render();
    }
    setup() { };
    template() { }
    render() {
      this.$target.innerHTML = this.template();
      this.setEvent();
    }
    setEvent() { }
    setState(newState) {
      this.state = newState;
      this.render();
    }
  }

  class Dongsu extends Component {
    setup() {
      this.state = { items: ['item1', 'item2', 'item3', 'item4'] };
    }
    template() {
      const { items } = this.state;
      return `
        <ul>
          ${items.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <button id="btn">추가</button>
    `
    }

    setEvent() {
      this.$target.querySelector('#button').addEventListener('click', () => {
        const { items } = this.state;
        this.setState({ items: [...items, `item${items.length + 1}`] });
      });
    }
  }

  new Dongsu(document.querySelector('#app'));
</script>
```

### 모듈화

<img width="230" alt="스크린샷 2022-01-15 오후 12 20 43" src="https://user-images.githubusercontent.com/87749134/149607075-b1db100c-897b-4d95-9195-b48dec3342da.png">

core 폴더에는 Component Class 생성

component 에는 Component class 를 extends 한 Dongsu class 생성

app.js 는 object 생성

<img width="617" alt="스크린샷 2022-01-15 오후 1 03 52" src="https://user-images.githubusercontent.com/87749134/149608179-deab117c-3392-4753-8cfe-f2bcc198d475.png">

<img width="617" alt="스크린샷 2022-01-15 오후 1 04 08" src="https://user-images.githubusercontent.com/87749134/149608186-93788e06-762f-47f9-89a6-02d0ef578b2c.png">

<img width="617" alt="스크린샷 2022-01-15 오후 1 04 20" src="https://user-images.githubusercontent.com/87749134/149608194-b015e079-d396-4ac8-9867-fa7c725ca4bf.png">

<img width="617" alt="스크린샷 2022-01-15 오후 1 04 28" src="https://user-images.githubusercontent.com/87749134/149608197-5c9358dd-d5e9-4852-a4cf-9fbd2a759031.png">

***

## 3. 이벤트 처리

### (1) 불필요한 이벤트 해제하기

추가하기 버튼과 삭제하기 버튼을 클릭할 때 발생하는 이벤트와 같이 반복적인 요소에 대해 각각 이벤트를 등록해야 할 땐 여간 불편한게 아니다.


```javascript
setEvent() {
  this.$target.querySelector("#btn").addEventListener('click', () => {
    const { items } = this.state;
    this.setState({ items: [...items, `item${items.length + 1}`] });
  });

  this.$target.querySelectorAll(".deleteBtn").forEach((button, index) => {
    button.addEventListener("click", () => {
      const { items } = this.state;
      items.splice(index, 1);
      this.setState({ items: items })
    })
  })
}
```

↓ 아래와 같이 한다면 훨씬 직관적으로 처리할 수 있다.

```javascript
  setEvent() {
    this.$target.addEventListener('click', ({ target }) => {
      const { items } = this.state;

      if (target.classList.contains("btn")) {
        this.setState({ items: [...items, `item${items.length + 1}`] });
      }

      if (target.classList.contains("deleteBtn")) {
        console.log(target.dataset.index); // 아까 만들어둔 버튼에 data-index를 이렇게 접근 가능함
        items.splice(target.dataset.index, 1);
        this.setState({ items: items })
      }
    });
  }
}
```

↓ 최종본

```javascript
class Dongsu extends Component {
  setup() {
    this.state = { items: ['item1', 'item2', 'item3', 'item4'] };
  }
  template() {
    const { items } = this.state;
    return `
      <ul>
        ${items.map((item, key) => `
        <li>
          ${item}
          <button class="deleteBtn" data-index="${key}">삭제</button> ${/* Element.dataset 으로 사용하기 위한 data-index 등록 */ ''}
        </li>
        `).join('')}
      </ul>
      <button class="btn">추가</button>
  `
  }
  setEvent() {
    this.$target.addEventListener('click', ({ target }) => {
      const { items } = this.state;

      if (target.classList.contains("btn")) {
        this.setState({ items: [...items, `item${items.length + 1}`] });
      }

      else if (target.classList.contains("deleteBtn")) {
        console.log(target.dataset.index); // 아까 만들어둔 버튼에 data-index를 이렇게 접근 가능함
        items.splice(target.dataset.index, 1);
        this.setState({ items: items })
      }
    });
  }
}
```

❗️ 다만, 기존의 setEvent는 render를 할 때 마다 실행하기 때문에, core/Component.js에 라이프 사이클을 변경해야 한다.

🧐 이건 이해가 안되네..

```javascript
class Component {
  state;
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.setEvent(); // 여기로 이동 (constructor에서 한 번만 실행한다.)  
    this.render();
  }
  setup() { };
  template() { }
  render() {
    this.$target.innerHTML = this.template();
    // this.setEvent();
  }
  setEvent() { }
  setState(newState) {
    this.state = newState;
    this.render();
  }
}

export default Component;
```

- event를 각각의 하위 요소가 아니라 ```component 의 target 자체에 등록하는 것이다.```

- 따라서 component 가 생성되는 시점에만 이벤트 등록을 해놓으면 ```추가로 등록할 필요가 없어진다.```

***

## 4. 컴포넌트 분할하기

위의 코드는 컴포넌트를 분리할 필요가 없다. 이러면 컴포넌트를 만들 이유가 없고, 나중에 코드를 관리하기 힘들다.

### (1) 폴더 구조 개선  

❗️ 폴더 구조를 개선하자

<img width="230" alt="스크린샷 2022-01-15 오후 8 24 37" src="https://user-images.githubusercontent.com/87749134/149620014-29547095-e6e6-4a19-a560-624835d7e9a8.png">

### (2) Component Core 변경

기존의 app.js를 main.js 로 변경하고 컴포넌트들을 조종할 App.js를 생성했다!.

각 컴포넌트들은 데이터를 상속 받거나 마운드 받아야하기 때문에 ```props```, ```mounted``` 를 추가하자.

```javascript
class Component {
  state;
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props; // $props 할당
    this.setup();
    this.setEvent()
    this.render();
  }
  setup() { };
  mounted () {}; // 마운트 생성
  template() { }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted(); // render 후에 mounted가 실행 된다.
  }
  setEvent() { }
  setState(newState) {
    this.state = newState;
    this.render();
  }
}

export default Component;
```

### (3) Entry Point 변경

↓ app.js를 main.js 로 변경

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>

<body>
  <div style="border: 2px solid black;" id="app"></div>
  <script src="./src/main.js" type="module"></script>
</body>

</html>
```
↓ main.js

```javascript
import App from "./App.js"

new App(document.querySelector('#app'));
```

### (4) 컴포넌트 분할

기존에 ```Dongsu.js``` 파일에 있던 내용을 ```App.js``` 로 넘겨주고, 각 컴포넌트들을 App.js에서 렌더링 해야한다.

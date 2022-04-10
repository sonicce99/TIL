# Valina javascript로 React 만들어보기  

## 목표

root라는 하나의 태그에 모든 하위 children을 몰아넣고 DOM tree를 만들어 한번에 render 시키자!  


## virtualDOM을 만들고 p태그 생성해보기

```javascript
function createDOM(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.tag);

  node.children.map(createDOM).forEach(element.appendChild.bind(element));

  console.log(element);

  return element;
}

const virtualDOM = {
  tag: "p",
  props: {},
  children: [
    {
      tag: "h1",
      props: {},
      children: ["React 만들기"],
    },
  ],
};

document.querySelector("#root").appendChild(createDOM(virtualDOM));
```

<img width="700" alt="스크린샷 2022-04-06 오후 9 38 45" src="https://user-images.githubusercontent.com/87749134/161976255-9e1fea47-1c94-455f-bb62-7319d8aadddb.png">

위의 코드는 virtualDOM이 자식이 많을 수록 너무 길어지고 appendChild를 하기 위해서 DOM Api를 사용해야 한다는 점이 좀 아쉬워서 아래와 같은 코드로 refactoring 된다.

```javascript
// app.js 사용자 입장

import { createDOM, render, createElement } from "./react.js";

const virtualDOM = createElement(
  "p",
  {},
  createElement("h1", {}, "React 만들기"),
  createElement(
    "ul",
    {},
    createElement("li", { style: "color:red" }, "첫 번째 아이템"),
    createElement("li", { style: "color:blue" }, "두 번째 아이템"),
    createElement("li", { style: "color:green" }, "세 번째 아이템")
  )
);

render(virtualDOM, document.querySelector("#root"));
```

```javascript
// react.js

export const createElement = (tag, props, ...children) => {
  props = props || {}

  return {
    tag,
    props,
    children,
  };
};

export const createDOM = (node) => {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.tag);

  Object.entries(node.props).forEach(([name, value]) =>
    element.setAttribute(name, value)
  );

  node.children.map(createDOM).forEach(element.appendChild.bind(element));

  return element;
};

export const render = (virtualDOM, rootContainer) => {
  rootContainer.appendChild(createDOM(virtualDOM));
};
```

사용자는 virtualDOM만 만들고 render함수를 호출해서 넣어주기만 하면 된다. 하지만 ereateElement를 호출해서 사용하는 방법은 굉장히 보기도 불편하다. 그래서 JSX 문법을 사용해서 태그 형태로 개선을 하게 된다.


```javascript
const virtualDOM = createElement("p", {},
  createElement("h1", {}, "React 만들기"),
  createElement("ul", {},  
    createElement("li", { style: "color:red" }, "첫 번째 아이템"),
    createElement("li", { style: "color:blue" }, "두 번째 아이템"),
    createElement("li", { style: "color:green" }, "세 번째 아이템")
  )
);

↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

const virtualDOM2 = (
  <p>
    <h1>React 만들기</h1>
    <ul>
      <li>첫 번째 아이템</li>
      <li>두 번째 아이템</li>
      <li>세 번째 아이템</li>
    </ul>
  </p>
);
```

❗️ ↓ babel을 사용해서 JSX 문법을 React.createElement 형태로 Transfiling 한다.

```javascript
// example  
const Hello = <h1>Hello</h1>

var Hello = React.createElement("h1", null, "Hello")
```

↓ JSX를 통해 사용자는 훨씬 편리하게 virtualDOM을 만들 수 있다.   

```javascript
// app.js
import { createDOM, render, createElement } from "./react.js";

const virtualDOM = (
  <p>
    <h1>React 만들기</h1>
    <ul>
      <li>첫 번째 아이템</li>
      <li>두 번째 아이템</li>
      <li>세 번째 아이템</li>
    </ul>
  </p>
);

render(virtualDOM, document.querySelector("#root"));
```

***

## 함수 Component 만들기

```javascript
// app.js
import { createDOM, render, createElement } from "./react.js";

function Title(props) {
  return <h1>{props.children}</h1>;
}

function Item(props) {
  return <li style={`color:${props.color}`}>{props.children}</li>  
}

const virtualDOM = (
  <p>
    <Title>React 정말 잘 만들기</Title>
    <ul>
      <Item color="red">첫 번째 아이템</Item>
      <Item color="blue">두 번째 아이템</Item>    
      <Item color="green">세 번째 아이템</Item>
    </ul>
  </p>
);

render(virtualDOM, document.querySelector("#root"));
```

<Title>React 정말 잘 만들기</Title> 은 아래 코드로 변환됌.    

React.createElement(Title(), null, "React 정말 잘 만들기")

```javascript
// react.js

export const createElement = (tag, props, ...children) => {
  props = props || {};

  if(typeof tag === "function") {
    if(children.length > 0) {
      return tag({
        ...props,
        children: children.length === 1 ? children[0] : children
      })
    } else {
      return tag(props);
    }
  } else {
    return { tag, props, children };  
  }
};
```

***

## Class 컴포넌트 만들기   

이제 virtualDOM은 App 이라는 함수로 변경한다.  

```javascript
const App = () => (
  <p>
    <Title>React 정말 잘 만들기</Title>
    <ul>
      <Item color="red">첫 번째 아이템</Item>
      <Item color="blue">두 번째 아이템</Item>    
      <Item color="green">세 번째 아이템</Item>
    </ul>
  </p>
);

render(<App />, document.querySelector("#root"));
```

조금 더 React스러워 졌다.  

여기서 App은 createElement가 만들어 놓은 ```객체```이다.

```javascript
// app.js
import { createElement, render, Component } from "./react.js"

class Title extends Component {
  render() {
    return <h1>{ this.props.children}</h1>
  }
}

const App = () => (
  <p>
    <Title>React 정말 잘 만들기</Title>
    <ul>
      <Item color="red">첫 번째 아이템</Item>
      <Item color="blue">두 번째 아이템</Item>    
      <Item color="green">세 번째 아이템</Item>
    </ul>
  </p>
);

render(<App />, document.querySelector("#root"));
```

```javascript
// react.js

export class Component {
  constructor(props) {
    this.props = props;
  }
}

function makeProps(props, children) {
  return {
    ...props,
    children: children.length === 1 ? children[0] : children  
  };  
}


export const createElement = (tag, props, ...children) => {
  props = props || {};

  if(typeof tag === "function") {
    // class 나 함수나 둘 다 function 타입이기 때문에 아래와 같은 조건문으로 구분  
    if(tag.prototype instanceof Component) {
      const instance = new tag(makeProps(props, children));
      return instance.render();
    } else {
      if(children.length > 0) {
        return tag(makeProps(props, children))
      } else {
        return tag(props);
      }  
    }

  } else {
    return { tag, props, children };  
  }
};
```

***

## virtualDOM

- virtualDOM의 장점은 이전의 virtualDOM 과 새로 바뀔 virtualDOM을 비교하고 바뀐 부분만 rendering 해준다는 점이다. 이는 실제 DOM을 비교하는 것보다 객체 대 객체로서 굉장히 적은 프로세스이기 때문에 굉장한 장점이 있다.  

↓ ```closure```를 통해 이전의 DOM(prevDOM) 을 계속 참조 할 수 있게 해준다.  

```javascript
export const render = (function() {
  let prevDOM = null;

  return function(virtualDOM, container) {
    if(prevDOM === null) {
      prevDOM = virtualDOM
    }

    // diff 알고리즘

    container.appendChild(createDOM(virtualDOM));
  }
})();
```

***

## React Hook

Hook은 Class를 작성하지 않고도 상태를 가질 수 있도록 합니다. 기존에는 Class 컴포넌트만이 상태를 가질 수 있었다. 함수 Component는 당연하게도 함수이기 때문에 실행 될때마다 초기값을 가질 수 밖에 없었다.

❗️ 제약사항 : 최상위(at the Level)에서만 Hook을 호출해야 합니다.  

```javascript
// react.js
const hooks = [];
let currentComponent = 0;

function makeProps(props, children) {
  return {
    ...props,
    children: children.length === 1 ? children[0] : children  
  };  
}

function useState(initValue) {
  let position = currentComponent - 1;
  if(!hooks[position]) {
    hooks[position] = initValue;
  }

  const modifier = nextValue => {
    hooks[position] = nextValue;
  };

  return [ hooks[position], modifier]  
}


export const createElement = (tag, props, ...children) => {
  props = props || {};

  if(typeof tag === "function") {
    // class 나 함수나 둘 다 function 타입이기 때문에 아래와 같은 조건문으로 구분  
    if(tag.prototype instanceof Component) {
      const instance = new tag(makeProps(props, children));
      return instance.render();

      hooks[currentComponent] = null;
      currentComponent++;

    } else {
      if(children.length > 0) {
        return tag(makeProps(props, children))
      } else {
        return tag(props);
      }  
    }

  } else {
    return { tag, props, children };  
  }
};
```

핵심 : 함수 Component가 호출된 다음에 hook이 함수 안에서 호출되서 이 index가 맞아진다는 것.  

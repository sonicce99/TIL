# React 내용정리


## Vanila javascript 를 사용하지 않는 이유

- 데이터 바인딩을 쉽게 하기 위해 Vue, React, Angular 를 사용한다. (코드양이 적어짐)

***

### React 설치하기

- 폴더를 하나 만들고 Vscode로 폴더 열기

- 터미널 열고 npx create-react-app (원하는 폴더명)

 > ex) npx create-react-app dongsu


***

## 내용

#### node.js를 설치한 이유

- create-react-app 이라는 라이브러리를 사용하기 위해  

#### react 에서는 HTML 대신에 JSX 라는 문법을 사용


- 우리는 App.js에 코딩을 하게 되는데 이건 js이기 때문에 class 라는 문법이 이미 있다. 따라서 클래스를 선언하고 싶으면 className 이라는 용어를 사용한다.

- 틀린 예: *JSX 에서는 <div class="title">하이하이</div> 처럼 클래스 명을 선언할때 class 라고 하지 않는다.*  


- 올은 예: *<div className="title">하이하이</div>*


#### 이미지 넣는 법

```javascript
import logo from './logo.svg'

function App() {

  let post : '강남 고기 맛집'

  return (
      <div className="App">
        <img src= { logo } /> // 이미지를 데이터 바인딩 함. (클래스 명, 변수, 함수도 마찬가지)  
      </div>
  )
}
```

#### JSX 에서 style 속성 집어 넣는법

```javascript
function App() {

  let post : '강남 고기 맛집'

  return (
      <div className="App">
        <div style={ {color: "blue", fontSize: '30px'} }>하이하이</div>
      </div>
  )
}
```

- 오브젝트 형식으로 넣어준다. ( javascript라 민감한 키워드가 많기 때문.)

- 대쉬 (-) 는 사용할 수 없다. 뺄셈 (-) 와 같기 때문. 따라서 camelCase작명 (fontSize)


### useState

*state는 react 의 데이터 저장공간.*

*자주 바뀌는 데이터는 state로 사용하기*


```javascript
import react, {useState} from 'react';

function App() {

  let [a,b] = useState(["하이하이하이", "바이바이바이"]);  

  return (
      <div className="App">
        <div>{ a[0] }</div>  // 하이하이하이가 찍힘. a[1] 하면 바이바이바이가 찍힘  
      </div>
  )
}
```

- 구조 분해 할당 문법으로 useState 함수를 쓰면 길이가 2인 배열이 생성되는데 첫번째 인수로는 useState에 담긴 내용이 저장되고 b에는 a를 변경할 수 있는 함수가 저장되어 있다.

> { a+1 } 이렇게 쓰면 값이 변경되지 않는다. 반드시 변수변경함수인 b를 이용해야 한다.

  >> { b(a+1) }

    >>> 변경함수를 사용하지 않으면 Render() 함수로 그려주는 시점을 리액트에서 인지하지 못함.

***그냥 변수 쓰지 굳이 useState를 쓰는 이유***

- 웹을 동적으로 사용하기 위해서

> 그냥 변수는 고정된 값을 가지고 있지만 useState를 쓰고 state가 변경되면 (새로고침 없이도!!) HTML이 자동으로 재렌더링 된다.


##### 🌟useState에서 setState는 비동기 (asynchronous) 로 동작합니다.  

*따라서 set 후에 바로 어떤 동작을 하려하면 이전 값으로 통신을 하게 됩니다.*

↓↓↓ 🚫 잘못된 예시  

```javascript
import React from "react";
import "./styles.css";

export default function App() {
  const [val, setVal] = React.useState("");

  const callAjax = () => {
    console.log(val);
  };

  const changeVal = (cVal) => {
    setVal(cVal);
    callAjax();
  };

  return (
    <div className="App">
      <h1>Reactjs setState is asynchronous</h1>
      <select value={val} onChange={(e) => changeVal(e.target.value)}>
        <option value="">ALL</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
    </div>
  );
}
```

↓↓↓ 올바른 예시 👍

```javascript
import React from "react";
import "./styles.css";

export default function App() {
   const [val, setVal] = React.useState("");

   React.useEffect(() => {
     const callAjax = () => {
       console.log(val);
     };

     callAjax();
   }, [val]);

    const changeVal = (cVal) => {
      setVal(cVal);
    };
    return (
      <div className="App">
       <h1>Reactjs setState is asynchronous</h1>
       <select value={val} onChange={(e) => changeVal(e.target.value)}>
          <option value="">ALL</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
       </select>
      </div>
      );
}
```


***

### 반복문

- map

```javascript
  import react, {useState} from 'react';

  let [a, b] = useState(["남자 코트 추천", "강남 우동 맛집", "파이썬 독학"]);

  {
    a.map((t,i) => {
      return (<div className="list">
      <h3>{t} <span  onClick={() => { d(c + 1)}}>👍</span>{c[i]}</h3>
      <p>11월 22일 발행</p>
      <hr />
    </div>)
    })
  }
```

- for

```javascript
  function repeat() {
    let array = [];

    for(let i=0; i<3; i++) {
      array.push(
      <div className="list">
      <h3>{a[i]} <span  onClick={() => { d(c + 1)}}>👍</span>{c[i]}</h3>
      <p>11월 22일 발행</p>
      <hr />
    </div>
    )}
    return array
  }


  {repeat()} // 이렇게 호출  
```

***

### if문

 JSX에서는 if문은 중괄호 안에 넣어도 인식을 할 수 없다. 따라서

 > 삼항연산자 사용

```javascript
  {
    modal === true
    ? <Modal />
    : null // JSX 관습 (텅 빈 HTML이라는 뜻)
  }
```


***

### props

```javascript
  function App() {
    let [a, setA] = useState(["남자 코트 추천", "강남 우동 맛집", "파이썬 독학"]);
    let [modal,setmodal] = useState(false);

    return (
      <div className="App">
        {
          modal === true
          ? <Modal a={a} />
          : null // JSX 관습 (텅 빈 HTML이라는 뜻)
        }
      </div>
    );
  }
```
ahrim🌟😀📍🎶🤪😭😢🧠👨‍👨‍👧‍👦🧶👗🧦👓🐮🐴🐞🦖🚀🛸🛸🗿🗽⌚️🦠🧬🛌🛏📅📆💙🇻🇮🇭🇰🇭🇰🇭🇰🇭🇰🇭🇰🇭🇰🇭🇰🇭🇰🇭🇰🇭🇰🇭🇰🇭🇰🇭🇰🇭🇰🇭🇰🇭🇰🇭🇰🇭🇰🇭🇭🇭🇰🇭🇰🇭🇰🇭🇰🇭🇭🇭🇭🇭🇭🇭🇰🇫🇯🇫🇯🇫🇯🇫🇯🇫🇯🇵🇫🇵🇫🇰🇷🇰🇷🇰🇷 2021.11.22

```javascript
  function Modal (props) {
    return (
    <div className="Modal">
      <h2>{props.a[0]}</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
    )}

  export default Modal
```


 ***

### 컴포넌트 생명주기


<img width="701" alt="스크린샷 2021-11-19 오후 8 29 06" src="https://user-images.githubusercontent.com/87749134/142615904-94f4a3c2-c3a6-4cd1-81a4-5aa04b619ddc.png">

***

### function type, class type

<img width="740" alt="스크린샷 2021-11-21 오후 11 43 27" src="https://user-images.githubusercontent.com/87749134/142766546-bd8325dc-7e57-4f4f-8213-4875937642b7.png">

extends: 오른쪽에 있는 놈의 성질을 물려받겠습니다.

***↓ 구버전 문법(state)***

<img width="500" alt="스크린샷 2021-11-22 오후 11 27 14" src="https://user-images.githubusercontent.com/87749134/142878916-eec49f2a-20e4-4e09-8039-bcd47a3abb50.png">

<img width="600" alt="스크린샷 2021-11-23 오후 12 25 47" src="https://user-images.githubusercontent.com/87749134/142970899-734aa771-4bf3-4d7f-a0ad-eb7a1e9cb5fe.png">

- bind(this) 꼭 쓰기

<img width="600" alt="스크린샷 2021-11-23 오후 12 26 54" src="https://user-images.githubusercontent.com/87749134/142970902-ea2e7567-2ce9-4bbd-80e0-77b599fc5e0d.png">

- chageName 을 함수 표현식으로 적으면 bind(this) 안적어도 됨


*구버전에서 setState는 변경하고 싶은 부분만 바꿔주는 반면 (age:30 은 건드리지 않음.)*
*신버전에서는 아에 대체를 해버림 (age:30은 위에 사진처럼 쓰면 없어짐)*


***

### 한 개의 버튼에서 2가지 이벤트 처리


```javascript
  <button onClick={() => {setmodal(!modal); setmodalState(i); }}>모달</button>
```

***


### 사용자 input 정보 받기

```javascript
  let [inputV, setinputV] = useState("")

  <input onKeyPress= {(event) => {
    if(event.key === "Enter") {
      setinputV(event.target.value)
      event.target.value =''
    }
  }} />
```

***


### Router (라우터)


- react-router-dom 설치

> npm install react-router-dom@5


- ↓↓↓ index.js 세팅하기

```javascript
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  document.getElementById('root')
)
```

> BrowserRouter  말고 HashRouter 도 있음.

>> HashRouter 는 라우팅을 더 안전하게 할 수 있게 도와준다.


- ↓↓↓ App.js

##### Route

```javascript
import { Link, Route, Switch } from 'react-router-dom'

<Route exact path="/">
  <div>메인페이지 입니다!</div>
</Route>

<Route path="/detail">
  <div>제품 상세페이지 입니다!</div>
</Route>

```

##### Link

```javascript
import { Link, Route, Switch } from 'react-router-dom'

<Link to="/">Home</Link>
<Link to="/detail">Detail</Link>
```


##### useNavigate

❗️ react-router v6 부터는 기존에 사용하던 useHistory 가 없어지고 useNavigate 로 변경되었다.

```javascript
// App.js
<Routes>
  <Route path="/challenge/:id" element={<Challenge />} />
</Routes>
```

```javascript
import { useNavigate } from "react-router-dom";

const Hi = () => {
    let navigate = useNavigate();

    return (
      <Button
        onClick={() => {
          navigate(`/challenge/${EachChallenge.id}`);
        }}
      >
      </Button>  
    )
}
```

```javascript
import { useMatch } from "react-router-dom";

const Bye = () => {

  let { params: { id }} = useMatch("/challenge/:id/");

  console.log(id);
}
```

##### Routes

❗️ react-router v6 부터는 기존에 사용하던 Switch 가 없어지고 Routes 로 변경되었다.

```javascript
import { Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Main />} />
  <Route path="/challenge/:id" element={<Challenge />} />
  <Route path="/saving" element={<Saving />} />
  <Route path="/deposit" element={<SavingDeposit />} />
  <Route path="/success" element={<SavingSuccess />} />
</Routes>
```

***

## redux 내용 정리

### 설치

```
  npm install redux react-redux
```

***

### 세팅하기 (reducer 세팅법)

- reducer 를 통해 state 를 수정한다.
index.js에서 reducer 로 어떻게 데이터를 수정할지 정해준 후 우리가 쓸 곳(Cart.js)에서 사용

*↓↓↓ index.js*

```javascript
  import { Provider } from 'react-redux';
  import { createStore } from 'redux';

  let 초기값  = [
    { id:0, name:'멋진신발', quantitiy:2 },
    { id:1, name:'멋진신발2', quantitiy:1 }
  ];

  function reducer(state = 초기값, action) {
    if(action.type === '수량증가')  // 수량증가라는 데이터 수정방법을 정의한 것.

      let newArray = [...state];
      newArray[0].quantitiy+=1;
      return newArray

    } else {
      return state // 값의 변화가 없다면 원래의 state가 반환
    }
  }

  let store = createStore(reducer);

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>  //Provider로 감싸진 모든 Component 들은 같은 state를 공유할 수 있다.
        <App />
      </Provider>
    </React.StrictMode>
    document.getElementById('root')
  )
```

*↓↓↓ Cart.js (store를 쓰고 싶은 컴포넌트)*  

```javascript
import { connect } from 'react-redux'

function Cart(props) {
  return (
    <button onClick={ () => { props.dispatch({ type: '수량증가' }) ;}}>+</button>  
  )
}

function 함수명(state) { // store 안에 있던 state 데이터를 가져오는 함수  
  return {
    state: state  
  }
}

export default connect(함수명)(Cart)

//export default Cart; 🚫🚫🚫
```

***  

### state와 reducer 가 더 필요하면?

- state와 reducer를 하나 더 만들면 된다!

- combineReducers 를 통해 reducer 들을 하나로 묶어준다!  

*↓↓↓ index.js*

```javascript
  import { createStore, combineReducers } from 'redux';

  let 초기값2 = true;

  function reducer2 (state = 초기값2, action) {
    if(action.type === 'alert닫기') {
      state = false;
      return state;
    } else {
      return state;
    }
  }

  let store = createStore(reducer, reducer2); 🚫🚫🚫

  let store = createStore(combineReducers( {reducer, reducer2} ));

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
    document.getElementById('root')
  )
```

*↓↓↓ Cart.js*

```javascript
  import { connect } from 'react-redux'

  function Cart(props) {
    return (
      <button onClick={ () => { props.dispatch({ type: '수량증가' }) ;}}>+</button>  
      {
        props.alert열렸니 === true
          ? (<div className="my-alert2">
            <p>지금 구매하시면 신규할인 20%</p>
            <button onClick={ props.dispatch(type: 'alert닫기') }>닫기</button>
            </div>)
          : null
      }  
    )
  }

  function 함수명(state) { // store 안에 있던 state 데이터를 가져오는 함수  
    return {
      state: state.reducer // reducer, reducer2 중에 reducer를 state로 쓰겠다.
      alert열렸니 : state.reducer2
    }
  }

  export default connect(함수명)(Cart)
```

- **redux에서 굳이 모든 데이터를 저장할 필요는 없음. 여러군데에서 필요한 데이터만 넣어서 쓰면 됨.**

- redux가 필요 없을 것 같은것은 그냥 useState() 쓰는게 좋음.  


### useSelector, useDispatch

장점 : props. 를 붙이지 않아도 state와 dispatch를 사용 할 수 있다.  

```javascript
import { useSelector, useDispatch } from "react-redux";

function Cart(props) {

  let state = useSelector((state) => state.reducer2);

  let dispatch = useDispatch();
}

export default Cart;
```


### useEffect

React에서는 한 함수 안에서 setState를 하고 console.log를 하면 console에는 한 박자씩 느리게 찍혀 나오는 경우가 생긴다. 왜냐하면 setState는 비동기 함수이기 때문이다.

↓↓↓ 이렇게 하면 한박자씩 느림  

```React
const changeExample = (e) => {
 setExample(e.target.value)
 console.log(example)
}
```

↓↓↓ 해결책🌟

```javascript
const example = (e) => {
 setExample(e.target.value)
}

useEffect(() => {
  console.log(example);
}, [example]);
```

example의 값이 변할 때 console.log가 호출이 되기 때문에 setExample이 example의 값을 바꾸고 나서 example의 값이 변한 것을 useEffect가 감지(?) 하고 console.log를 실행한다고 이해하면 쉽다!


1. useEffect는 처음 렌더링 되고 난 후 무조건 한번 실행됩니다.

2. useEffect에 배열로 지정한 useState 값이 변경되면 실행되게 됩니다.

> 즉 렌더링, 변수값, 오브젝트가 달라지면 그것을 인지하고 업데이트를 해주는 함수입니다.


##### 사용법

```javascript
useEffect(() => {});

// Or

useEffect(() => {},[]);

// Or

const [name,setName] = useState();
useEffect(() => {},[name]);
```

1. 첫번째 useEffect는 가장 기본형태 이지만, 거의 사용하지 않습니다.

> Dependency가 없기 때문에 렌더링 끝나고 한번, 그리고 어떤 작은요소가 변화한다면 시시때때로 useEffect가 발동되어 불필요한 실행이 너무 많아집니다.

2. useEffect를 렌더링 후 단 한번만 실행하고 싶을 때 사용합니다. 콜백 함수 뒤에 대괄호가 있습니다.

3. useEffect를 렌더링 후 한번, 그리고 state값이 변경될 때마다 실행됩니다.  


### react-cookies 사용하기

```javascript
import cookie from "react-cookies";
```

react-cookies 의 패키지는 load, save, remove 이렇게 3가지가 있다. (더 있을 수도 있음?)

```javascript
const tid = cookie.load("token_id"); // load는 save로 저장된 값을 불러오고 싶을 떄 사용
```

```javascript
cookie.save("token_id", res.data.token_id, {
  path: "/", // 모든 페이지에서 쿠키에 접근 가능, 만약 "/a" 인 경우 ~~~.com/a 에서만 쿠키에 접근가능
  expires,
  secure: true, // https로 통신할 때만 쿠키가 저장된다.
  httpOnly: true // 자바스크립트 코드로 쿠키에 비정상적인 접근을 하지 않도록 막는다.
});
```

save는 key, value, option 3가지 파라미터를 받는다.

```javascript
cookie.remove("token_id", { path: "/" });
```

### useRef

JavaScript 를 사용 할 때에는, 우리가 특정 DOM 을 선택해야 하는 상황에 getElementById, querySelector 같은 DOM Selector 함수를 사용해서 DOM 을 선택합니다.

리액트를 사용하는 프로젝트에서도 가끔씩 DOM 을 직접 선택해야 하는 상황이 발생 할 때도 있습니다. 예를 들어서 특정 엘리먼트의 크기를 가져와야 한다던지, 스크롤바 위치를 가져오거나 설정해야된다던지, 또는 포커스를 설정해줘야된다던지 등 정말 다양한 상황이 있겠죠. 추가적으로 Video.js, JWPlayer 같은 HTML5 Video 관련 라이브러리, 또는 D3, chart.js 같은 그래프 관련 라이브러리 등의 외부 라이브러리를 사용해야 할 때에도 특정 DOM 에다 적용하기 때문에 DOM 을 선택해야 하는 상황이 발생 할 수 있습니다.

그럴 땐, 리액트에서 ref 라는 것을 사용합니다.

함수형 컴포넌트에서 ref 를 사용 할 때에는 useRef 라는 Hook 함수를 사용합니다.

```javascript
import React, { useState, useRef } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });
  const nameInput = useRef();

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: '',
      nickname: ''
    });
    nameInput.current.focus();
  };

  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={nameInput}
      />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
```

useRef() 를 사용하여 Ref 객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM 에 ref 값으로 설정해주어야 합니다. 그러면, Ref 객체의 .current 값은 우리가 원하는 DOM 을 가르키게 됩니다.

위 예제에서는 onReset 함수에서 input 에 포커스를 하는 focus() DOM API 를 호출해주었습니다.

이제 브라우저에서 인풋에 값을 입력한 다음에 초기화를 눌러보세요. 이름 input 에 포커스가 잘 잡히나요?

***

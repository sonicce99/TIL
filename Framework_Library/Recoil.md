# Recoil

기존의 useState나 Context Api 를 사용하는 것이 좋지만, 한계가 존재한다.

한계점

1. 상태를 공유하려면 상위요소까지 계속 끌어올려서 사용해야한다는 불편함이 존재.

2. Context Api는 사용하려면 계속 Context 로 감싸줘야하는 불편함이 존재.  


Recoil는 페이스북에서 만들었기 때문에 가장 React 스럽게 최적화 할 수 있다.

## 개요

Recoil을 사용하면 atoms (공유 상태)에서 selectors (순수 함수)를 거쳐 React 컴포넌트로 내려가는 data-flow graph를 만들 수 있다. Atoms는 컴포넌트가 구독할 수 있는 상태의 단위다. Selectors는 atoms 상태값을 동기 또는 비동기 방식을 통해 변환한다.

## Atom

Atom은 상태(state)의 일부를 나타낸다. Atoms는 어떤 컴포넌트에서나 읽고 쓸 수 있다. atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독한다. 그래서 atom에 어떤 변화가 있으면 그 atom을 구독하는 모든 컴포넌트들이 재 렌더링 되는 결과가 발생할 것이다.

## Selectors

Selectors는 상태를 기반으로 하는 파생 데이터를 계산하는 데 사용된다. 최소한의 상태 집합만 atoms에 저장하고 다른 모든 파생되는 데이터는 selectors에 명시한 함수를 통해 효율적으로 계산함으로써 쓸모없는 상태의 보존을 방지한다.

Selectors는 useRecoilValue()를 사용해 읽을 수 있다. useRecoilValue()는 하나의 atom이나 selector를 인자로 받아 대응하는 값을 반환한다. fontSizeLabelState selector는 writable하지 않기 때문에 useRecoilState()를 이용하지 않는다.

즉 어떤 상태가 있으면 그 상태를 바꾼뒤에 사용할 수 있다는 뜻.

## useRecoilState

- 데이터를 가져와서 사용

## useSetRecoilState

```javascript
function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = ({target: {value}}) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

// 고유한 Id 생성을 위한 유틸리티
let id = 0;
function getId() {
  return id++;
}
```

## useRecoilValue

- Selectors에서 가져와서 쓸 때 사용


## 기본 사용법   

1. index.js 파일에 RecoilRoot 를 선언한다.

```javascript
// index.jsx

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
```

2. atom을 설정해준다.

```javascript
// store.js
import { atom } from "recoil";

const fontSizeState = atom({
  key: 'fontSizeState',
  default: 14,
});
```

3. 컴포넌트가 atom을 읽고 쓰게 하기 위해서는 useRecoilState()를 아래와 같이 사용하면 된다.

```javascript
// FontButton.jsx

function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return (
    <button onClick={() => setFontSize((size) => size + 1)} style={{fontSize}}>
      Click to Enlarge
    </button>
  );
}
```

```javascript
// Text.jsx

function Text() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return <p style={{fontSize}}>This text will increase in size too.</p>;
}
```

- FontButton컴포넌트에서 버튼을 클릭하면 Text.jsx에서의 p 의 폰트 크기가 같이 커지게 된다.


## Selectors 포함 사용법

```javascript
// store.js
import { atom, selector } from "recoil";

const fontSizeState = atom({
  key: 'fontSizeState',
  default: 14,
});


const fontSizeLabelState = selector({
  key: 'fontSizeLabelState',
  get: ({get}) => {
    const fontSize = get(fontSizeState);
    const unit = 'px';

    return `${fontSize}${unit}`;
  },
});
```

```javascript
function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const fontSizeLabel = useRecoilValue(fontSizeLabelState);

  return (
    <>
      <div>Current font size: ${fontSizeLabel}</div>

      <button onClick={setFontSize(fontSize + 1)} style={{fontSize}}>
        Click to Enlarge
      </button>
    </>
  );
}
```

## 비동기 처리

```javascript
const currentUserNameQuery = selector({
  key: 'CurrentUserName',
  get: async ({get}) => {
    const response = await myDBQuery({
      userID: get(currentUserIDState),
    });
    return response.name;
  },
});

function CurrentUserInfo() {
  const userName = useRecoilValue(currentUserNameQuery);
  return <div>{userName}</div>;
}
```

-  React 렌더 함수가 동기인데 promise가 resolve 되기 전에 무엇을 렌더 할 수 있을까요? Recoil은 보류중인 데이터를 다루기 위해 React Suspense와 함께 동작하도록 디자인되어 있습니다. 컴포넌트를 Suspense의 경계로 감싸는 것으로 아직 보류중인 하위 항목들을 잡아내고 대체하기 위한 UI를 렌더합니다.

```javascript
function MyApp() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <CurrentUserInfo />
      </React.Suspense>
    </RecoilRoot>
  );
}
```

## 에러 처리하기

- 만약 요청에 에러가 있다면 어떻게 해야 할까요? Recoil selector는 컴포넌트에서 특정 값을 사용하려고 할 때에 어떤 에러가 생길지에 대한 에러를 던질 수 있습니다. 이는 React <ErrorBoundary>로 잡을 수 있습니다

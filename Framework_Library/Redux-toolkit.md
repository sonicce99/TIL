# Redux toolkit

Redux Toolkit은 Redux의 ```standard way``` 를 기대한 패키지이다.

Redux의 3가지 문제를 해결하고자 만들게 되었다.

- Redux의 복잡한 store 설정을 해결하자!

- Redux를 사용하려면 너무 많은 패키지를 사용하므로 이를 해결하기 위해!

- Redux는 boilerplate code가 너무 많아!


Whether you're a brand new Redux user setting up your first project, or an experienced user who wants to simplify an existing application, ```Redux Toolkit``` can help you make your Redux code ```better```.


## What's Included

Redux Toolkit includes these APIs:

### configureStore()

간단한 설정과 default를 위해 ```createStore```을 감싸세요. createStore은 자동적으로 reducer 들을 combine하고 어떤 Redux middleware 라고 추가할 수 있습니다. (Redux-thunk는 default) 그리고 ```Redux DevTools EXtention``` 사용을 가능하게 합니다.


### createAction()

기존 리덕스 코어 라이브러리에서 액션을 정의하는 일반적인 접근법은 액션 타입 상수와 액션 생성자 함수를 분리하여 선언하는 것이었습니다. RTK에서는 이러한 두 과정을 createAction 함수를 사용하여 하나로 결합하여 추상화했습니다.

```javascript
// BEFOR
const INCREMENT = 'counter/increment'

function increment(amount: number) {
  return {
    type: INCREMENT,
    payload: amount,
  }
}

const action = increment(3)
// { type: 'counter/increment', payload: 3 }
```

```javascript
// AFTER
import { createAction } from '@reduxjs/toolkit'

const increment = createAction('counter/increment')

const action = increment(3)
// { type: 'counter/increment', payload: 3 }
```

### createReducer()

- Redux reducers are often implemented using a ```switch``` statement, with one ```case``` for every handled action type.

↓ 이 접근 방식은 잘 작동하지만 약간의 상용구와 오류가 발생하기 쉽습니다. 예를 들어 기본 케이스나 초기 상태 설정을 잊어버리기 쉽습니다.

```javascript
const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, value: state.value + 1 }
    case 'decrement':
      return { ...state, value: state.value - 1 }
    case 'incrementByAmount':
      return { ...state, value: state.value + action.payload }
    default:
      return state
  }
}
```

↓ createReducer 도우미는 이러한 reducer의 구현을 간소화합니다.


builder는 ```addCase```, ```addMatcher```, ```addDefaultCase``` 함수를 제공합니다.

- **builder.addCase(actionCreator, reducer)** : 액션 타입과 맵핑되는 케이스 리듀서를 추가하여 액션을 처리합니다. addMatcher 또는 addDefaultCase 메서드 보다 먼저 작성되어야 합니다.

- **builder.addMatcher(matcher, reducer)** : 새로 들어오는 모든 액션에 대해서 주어진 패턴과 일치하는지 확인하고 리듀서를 실행합니다.

- **builder.addDefaultCase(reducer)** : 그 어떤 케이스 리듀서나 매처 리듀서도 실행되지 않았다면, 기본 케이스 리듀서가 실행됩니다.


```javascript
import { createAction, createReducer } from '@reduxjs/toolkit'

const increment = createAction('increment')
const decrement = createAction('decrement')

function isActionWithNumberPayload(action) {
  return typeof action.payload === 'number'
}

const reducer = createReducer(
  {
    counter: 0,
    sumOfNumberPayloads: 0,
    unhandledActions: 0,
  },
  (builder) => {
    builder
      .addCase(increment, (state, action) => {
        // action is inferred correctly here
        state.counter += action.payload
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(decrement, (state, action) => {
        state.counter -= action.payload
      })
      // You can apply a "matcher function" to incoming actions
      .addMatcher(isActionWithNumberPayload, (state, action) => {})
      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {})
  }
)
```

❗️ ```builder.addCase ``` 호출은 항상 ```builder.addMatcher``` or ```builder.addDefaultCase``` 보다 먼저 호출되어야 합니다.

❗️ ```builder.addMatcher```에 대한 모든 호출은 ```builder.addCase``` 호출 후 및 ```builder.addDefaultCase``` 호출 전에 이루어져야 합니다.

***

## Quick Start

- Rudux toolkit의 간단한 소개 & 어떻게 정확하게 사용하는지 예시

### Redux Toolkit / React-Redux​ 설치  

```bash
Install Redux Toolkit and React-Redux​
```

### Redux Store 만들기 (with TypeScript)  

```javascript
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({  
  reducer: {
    counter: counterReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```

### React에 Store 연결

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

### reducer 생성

```javascript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

### React Component에서 Rudux state 활용

```javascript
import React from 'react'
import { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
```

***

## 요약

- ```configureStore```를 활용해 Redux store 생성하기

- ```createSlice```를 활용해 "slice" reducer를 생성한다.  

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

### createReducer()


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

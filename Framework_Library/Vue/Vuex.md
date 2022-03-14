# Vuex 구조

```javascript
// store > index.js

import { createStore } from 'vuex'
import user from './user'
import admin from './admin'

export default createStore({
  modules: {
    user,
    admin
  }
})
```

```javascript
// store > user.js

export default {
  // 하나의 store에서 모듈화 해서 사용하겠다.
  namespaced: true,

  // 각각의 데이터 (상태)  
  state: () => ({

  }),

  // computed와 같은 개념  
  getters: {

  },

  // methods 중에서 mutations에서만 data를 변경할 수 있음.   
  mutations: {

  },

  // 데이터 수정을 하지 않는 모든 methods는 actions에서 관리 (비동기로 동작)
  actions: {
    Blah({ state, getters, commit }) {

    }
  }
}
```

# Redux

Redux는 React 생태계에서 가장 사용률이 높은 상태관리 라이브러리입니다.

Redux를 사용하면 컴포넌트의 상태관련 로직들을 다른 파일들로 분리시켜서 더욱 효율적으로 관리 할 수 있고 글로벌 상태관리도 쉽게 할 수 있다.

## Redux와 Context API를 사용하는 것의 차이

- 미들웨어

> 리덕스의 미들웨어를 사용하면 액션 객체가 리듀서에 처리되기 전에 우리가 원하는 작업들을 수행할 수 있습니다.

## Redux를 언제 사용할까?

1. 프로젝트의 규모가 큰가?

  - Yes: 리덕스
  - No: Context API

2. 비동기 작업을 자주 하게 되는가?

  - Yes: 리덕스
  - No: Context API

3. 리덕스를 배워보니까 사용하는게 편한가?

  - Yes: 리덕스
  - No: Context API 또는 MobX

***

## Action (액션)

- 상태에 어떤 변화가 필요하다면 우리는 액션이라는 것을 발생시킵니다.

> 액션 객체는 type 필드를 필수적으로 가지고 있어야 하고, 그 외의 값은 개발자 마음대로 넣어줄 수 있다.

```javascript
{
  type: "ADD_TODO",
  data: {
    id: 0,
    text: "리덕스 배우기"
  }
}
```

## Action Creator (액션 생성 함수)  

- 실제로 어떤 행동을 할지에 대해서 명시하는 부분.  

```javascript
export function addTodo(data) {
  return {
    type: "ADD_TODO",
    data
  };
}

// 화살표 함수로도 만들 수 있습니다.
export const changeInput = text => ({
  type: "CHANGE_INPUT",
  text
});
```

## Reducer (리듀서)  

- 변화를 실제로 일으키는 함수

> 리듀서는, 현재의 상태와, 전달 받은 액션을 참고하여 새로운 상태를 만들어서 반환합니다.  

```javascript
function counter(state, action) {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      return state;
  }
}
```

## Store, dispatch

- 리덕스에서는 한 애플리케이션당 하나의 스토어를 만들게 됩니다. 스토어 안에는, 현재의 앱 상태와, 리듀서가 들어가있고, 추가적으로 몇가지 내장 함수들이 있습니다.

- 디스패치는 스토어의 내장함수 중 하나입니다. 디스패치는 액션을 발생 시키는 것 이라고 이해하시면 됩니다. dispatch 라는 함수에는 액션을 파라미터로 전달합니다.. dispatch(action) 이런식으로 말이죠.

## 상태는 읽기 전용입니다.

- 리덕스에서 불변성을 유지해야 하는 이유는 내부적으로 데이터가 변경 되는 것을 감지하기 위하여 shallow equality 검사를 하기 때문입니다. 이를 통하여 객체의 변화를 감지 할 때 객체의 깊숙한 안쪽까지 비교를 하는 것이 아니라 겉핥기 식으로 비교를 하여 좋은 성능을 유지할 수 있는 것이죠.

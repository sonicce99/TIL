# Vue

### CDN 으로 사용하기  



```html
  <script src="https://unpkg.com/vue@next"></script>

  <div id="app">
    <h1>{{ message }}</h1>
  </div>
```


```javascript
  Vue.createApp({
    data: function () {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
```


### npm으로 시작하기

```
vue create (원하는 폴더명) // 폴더로 vue 만들기
```

```
npm install vue  // 폴더가 열려있는 상태에서 dependencies로 vue 생성
```

***


### 데이터 바인딩 방식 2가지

- JS 데이터를 HTML에 꽂아넣는 문법


1. **{{ 첫번째 방식 }}**

- {{ 데이터 }} 처럼 괄호를 한다.


2. **:속성 = "데이터 이름"**

- <h4 class="red" :style="hat">베르튬모자<h4>

> 속성을 데이터 바인딩을 하고 싶으면 {{}} 를 하는것이 아니라 앞에 : 문자를 입력한다.



*데이터 바인딩을 하는 이유*

1. 어떤 값을 HTML에 하드코딩해 놓으면 나중에 변경이 어려움.

2. Vue의 실시간 자동 렌더링을 사용할 수 있음. (자주 변할거 같은 데이터들은 데이터로 보관하고 데이터 바인딩을 할 것)  



### 반복문

```Vue
<div class="menu">
  <a v-for="변수 in 반복횟수 :key="변수">"Home</a>
</div>
```

- 🌟 반복문 쓸 때 꼭 :key를 입력할 것. 안하면 에러

- 🌟 반복문 안에 반복횟수는 꼭 숫자 말고 데이터명을 집어넣어도 해당 데이터들의 갯수만큼 반복 실행됨. (javascript의 for in과 비슷)  


```HTML
<div class="menu">  //if(반복횟수가 3회 일 때)
  <a>Home</a>
  <a>Home</a>
  <a>Home</a>
</div>
```
***

```Vue
<div class="menu">
  <a v-for="(a,i) in 데이터 :key="i">" {{ a }} </a>
</div>
```

- 여기서 a는 데이터 내의 하나하나의 요소들이 오고 i는 인덱스가 옴  

```
<script>
  export default {
    name: "App",

    data() {
      return {
        신고수 : 0;
      }
    },

    methods : {
      increase() {
        신고수 +=1; // data에 있는 값을 methods에서 쓰고 싶으면 바로 쓸 수 있는 것이 아니라 this.신고수 라고 해야 됨 여기서 this는 내 object를 뜻함. (this.신고수)  
      }
    },
  }
</script>
```

- 위와 같이 하면 Error 가 난다.

> data에 있는 값을 methods에서 쓰고 싶으면 바로 쓸 수 있는 것이 아니라 this.신고수 라고 해야 됨 여기서 this는 내 object를 뜻함. (this.신고수)


### Components

**App.vue**

```Vue
<template>
  <MyBtn />
</template>

<script>
import MyBtn from '~/components/MyBtn'

export default {
  components: {
    MyBtn
  }
}
</script>
```


- MyBtn이라는 뷰파일을 가져와서 컴포넌트로 연결 시켜면 해당 html에서 그대로 가져와서 사용할 수 있다. 이런 컴포넌트의 장점은 재활용을 할 수 있다는 점이다.


**MyBtn.vue**

```Vue
<template>
  <div class="btn">
    Apple
  </div>
</template>

<style scoped>
  .btn {
    display: inline-block;
    margin: 4px;
    padding: 6px 12px;
    border-radius: 4px;
    background-color: gray;
    color: white;
    cursor: pointer;
  }
</style>
```

- 이때 똑같은 디자인을 그냥 가져다 쓰면 활용도가 떨어지게 된다. 그래서 같은 코드를 가져오지만 특정부분부분 커스텀 하게 할 수 있다.



**App.vue**

```Vue
<template>
  <MyBtn />
  <MyBtn color="royalblue"/>  
  <MyBtn />
</template>

<script>
import MyBtn from '~/components/MyBtn'

export default {
  components: {
    MyBtn
  }
}
</script>
```

- 나는 2번째 버튼은 royalblue 색깔로 하고 싶어서 이렇게 적었지만 적용이 되지 않는다. 우리는 위의 코드에 royalblue라고 적은 것을 컴포넌트에서 받아서 사용 할 수 있도록 해야하는데 이때 props라는 것이 필요하다.


**MyBtn.vue**

```Vue
<template>
  <div
    :style="{ backgroundColor: color }"
    class="btn">
    Apple
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: 'String',
      default: 'gray'
    }
  }
}
</script>

<style scoped>
  .btn {
    display: inline-block;
    margin: 4px;
    padding: 6px 12px;
    border-radius: 4px;
    background-color: gray;
    color: white;
    cursor: pointer;
  }
</style>
```

### V-model

```
  <input type="text" v-model.trim()="message">
```
- v-model은 앞에 : 기호 없음.

- V-model은 양방향 데이터 바인딩을 가능하게 함. 하지만 한글은 적용이 안됨.

- v-model.lazy 는 @change와 같음. 엔터를 누르거나 포커스를 해제한다면 실행됨.

- v-model.trim() 은 앞 뒤 공백을 제거해줌

- v-model.number 는 문자로 입력된 input을 숫자로 변경해줌.


## 네비게이션 가드 (Navigation guard)

- 뷰 라우터로 특정 URL에 접근할 때 해당 URL의 접근을 막는 방법.

> 예를 들어 사용자의 인증 정보가 없으면 특정 페이지에 접근을 못하게 할 때 사용하는 기술.

#### 종류

1. 애플리케이션 전역에서 동작하는 **전역 가드**

2. 특정 URL 에서만 동작하는 **라우터 가드**

3. 라우터 컴포넌트 안에 정의하는 **컴포넌트 가드**


### 전역 가드

```Vue
var router = new VueRouter();

router.beforeEach(function (to, from, next) {
  // from : 어디에서
  // to : 어디로
  // next : to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수  
  })
```


### <RouterView/>

만약 로컬 호스트 주소가 http://localhost:8080/ 이라고 하자.

Certification.vue 파일에 다음과 같은 코드가 있다.

```vue
  <template>
    <RouterView/>

    <RouterLink to="/">
      홈으로
    </RouterLink>

  </template>
```

Certification.vue 이 갈 수 있는 주소는 다음과 같다.

<img width="389" alt="스크린샷 2021-11-13 오후 9 15 15" src="https://user-images.githubusercontent.com/87749134/141643432-19fd37a2-f757-4d37-b95f-5f2a35b2d003.png">


SignIn과 SignUp 2가지이다.

이들에 대한 주소는 다음과 같다.

- 로그인 http://localhost:8080/certification/signin  

- 회원가입 http://localhost:8080/certification/newuser  


결국 <RouterView/> 위에 로그인과, 회원가입 컴포넌트가 올라가서 해당 부분만 로딩이 된다는 뜻이다.

```Vue
<RouterLink to="/">
  홈으로
</RouterLink>
```
위 코드 부분은 <RouterView/> 와 상관이 없으므로 로그인 페이지에서도 떠있고 회원가입 페이지에서도 떠있다.

<img width="418" alt="스크린샷 2021-11-13 오후 9 19 50" src="https://user-images.githubusercontent.com/87749134/141643561-7d7f748f-93e1-42c6-8795-a21b17f21d55.png">

<img width="418" alt="스크린샷 2021-11-13 오후 9 19 42" src="https://user-images.githubusercontent.com/87749134/141643562-448331f7-c1b7-4a91-a18f-9c4ff59e8844.png">

### computed Getter, Setter

기본적으로 computed는 Getter이다. 하지만 값을 변경할 수도 있다.

```javascript
<script>
export default {
  data() {
    return {
      msg : Hello Computed!
    }
  },
  computed: {
    reversedMessage: {
      get() {
        return Blah Blah Blah
      },
      set(value) {
        this.msg = value
      }
    }
  },
  methods: {
    add() {
      this.reversedMessage += "!?"
    }
  }
}
</script>
```

### Watch

data, computed에 존재하는 값을 계속 watch (지켜보고) 하다가 값이 변경되면 내용을 수행  

```javascript
<script>
export default {
  data() {
    return {
      msg : Hello Computed!
    }
  },
  computed: {
    reversedMessage: {
      return Blah Blah Blah
    }
  },
  watch: {
    msg() {
      console.log(this.msg)
    }
    // or
    msg(value) { // 변경된 값    
      console.log(value)
    }
  },
  methods: {
    changeMessage() {
      this.msg += "Good!"
    }
  }
}
</script>
```

### Class 바인딩

조건에 따라서 Class 이름 설정

```javascript
:class="{ active : isActive, "text-danger" : hasError }"    
// isActive 가 true 이면 active라는 이름 사용, false면 사용 X  
```

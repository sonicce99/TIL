# async await

### async

- function 앞에 async를 붙이면 해당 함수는 항상 Promise를 반환합니다. Promise가 아닌 값을 반환 하더라도 이행 상태의 Promise (resolved promise) 로 값을 감싸 이행된 Promise가 반환 되도록 합니다.

```javascript
async function f() {
  return 1;
}

f().then(alert); // 1
```

- 명시적으로 Promise를 반환하는 것도 가능한데, 결과는 동일합니다.

```javascript
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

async가 붙은 함수는 반드시 프라미스를 반환하고, 프라미스가 아닌 것은 프라미스로 감싸 반환합니다.
굉장히 간단하죠? 그런데 async가 제공하는 기능은 이뿐만이 아닙니다.

또 다른 키워드 await는 async 함수 안에서만 동작합니다. await는 아주 멋진 녀석이죠.


### await

- javascript는 await 키워드를 만나면 promise가 처리될때 까지 기다립니다. 결과는 그 이후 반환됩니다.

🌟 ↓↓↓ .then 호출을 사용한 예제  

```javascript
function loadJson(url) {
  return fetch(url)
    .then(response => response.json());
}

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`)
    .then(response => response.json());
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// 함수를 이용하여 다시 동일 작업 수행
loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
  // ...
```

🌟 ↓↓↓ async await 를 사용한 예제   

```javascript
async function showAvatar() {

  // JSON 읽기
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // github 사용자 정보 읽기
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // 아바타 보여주기
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // 3초 대기
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

⛔️ await 는 최상위 레벨 코드에서는 작동하지 않습니다.

```javascript
// 최상위 레벨 코드에선 문법 에러가 발생함
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
```

↓↓↓ 아래 코드는 가능  

```javascript
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

🌟 하지만 익명 async 함수로 코드를 감싸면 최상위 레벨 코드에도 await를 사용할 수 있습니다.

### 에러 핸들링

프라미스가 정상적으로 이행되면 await promise는 프라미스 객체의 result에 저장된 값을 반환합니다. 반면 프라미스가 거부되면 마치 throw문을 작성한 것처럼 에러가 던져집니다.

```javascript
async function f() {
  try {
    let response = await fetch('http://유효하지-않은-주소');
  } catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}

f();
```

### Promise.all

여러 개의 프라미스가 모두 처리되길 기다려야 하는 상황이라면 이 프라미스들을 Promise.all로 감싸고 여기에 await를 붙여 사용할 수 있습니다.

여러 작업이 있고, 이 작업들이 모두 완료될 때까지 기다리려면 Promise.all을 활용할 수 있다는 점도 알고 계시기 바랍니다.

```javascript
// 프라미스 처리 결과가 담긴 배열을 기다립니다.
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

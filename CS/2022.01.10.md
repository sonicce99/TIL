# Express

## 1. Routing, Middleware, Static file, Template engine

Express 는 Node.js 환경에서 동작하는 웹 애플리케이션 프레임워크이다.

Node.js 로 http 모듈을 사용해 웹 서버에 필요한 기능들을 하나하나 다 구현하고 있으면 정말 복잡하고 귀찮은 일이 될 것이다. 이것을 간단하게 해주는 것이 Epress!!

여기서 Express-generator라는 패키지를 통해서 프레임워크에 필요한 pakage.json과 기본 구조까지 잡을 수 있다!

### 1.1 Express-generator 설치

```javascript
npm i -g express-generator

express server --view=ejs // 여기서 server는 폴더명이다. 원하는 폴더명을 적으면 된다.

cd server

npm install
```

<img width="229" alt="스크린샷 2022-01-10 오후 6 07 55" src="https://user-images.githubusercontent.com/87749134/148741169-319e716f-1412-4b88-8a65-3d1ffa4850bf.png">


### 1.2 Hello world 만들기

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
```

클라이언트가 GET 방식으로 루트 URL(http://localhost:3000/)에 요청을 보내면 서버는 ‘Hello World!’로 응답할 것이다.

### 1.3 Routing

```javascript
// GET method route
app.get('/api/books', (req, res) => res.send('GET request to the /api/books'));

// POST method route
app.post('/api/books', (req, res) => res.send('POST request to the /api/books'));

// localhost:3000/user/<userId>/item/<itemId>
app.get('/user/:userId/item/:itemId', (req, res) => {
  const { userId, itemId } = req.params;
  res.send(`userId: ${userId}, itemId: ${itemId}`);
});
```

next()를 사용하면 후속 route handler로 제어를 전달할 수 있다.

```javascript
const cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

const cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

const cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);

app.get('/example/d', [cb0, cb1], (req, res, next) => {
  console.log('the response will be sent by the next function ...');
  next();
}, (req, res) => res.send('Hello from D!'));
```

### 1.4 Response method

<img width="600" alt="스크린샷 2022-01-10 오후 7 37 28" src="https://user-images.githubusercontent.com/87749134/148752403-5cdba586-ed98-4665-b9fb-cf14d8ca6d5d.png">

***

## Express 의 기본적인 에러 처리 방식

Error 가 발생했을 경우 반드시 Client에 Error 관련 정보를 알려야 한다. 에러는 Client에 의한 것 일 수도 있고 Server에 의한 것 일 수도 있다.

*Express 에서 Error 처리는 매개변수가 4개 (err, req, res, next) 인 미들웨어 함수를 사용한다.*

```javascript
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
```

***

## MemoryStore를 사용한 Session 관리와 Redis를 사용한 영속적 Session 관리

로그인 인증 등의 용도로 Session을 사용한다. Express는 메모리 상에 Session data를 저장할 수 있다. 개발을 위한 MemoryStore의 사용은 문제될 것이 없지만 production 환경에서 MemoryStore의 사용은 적절하지 않으며 복수 서버 상에서의 Session data 공유도 MemoryStore에서는 불가능하다.

따라서 production 환경에서는 Redis, MongoDB를 사용하여 영속적 Session data 관리하는 것이 일반적이다.

### 1.1 HTTP Stateless Protocol

http 프로토콜은 ```stateless protocol``` 이므로 상태 (state) 를 유지하지 않는다.

HTTP 프로토콜은 요청(request)를 전송하고 응답(response)를 전송받은 시점에서 통신이 종료되며 어떠한 상태 정보도 남지 않는다. 즉, 특정 클라이언트에서 동일 서버에 반복하여 접속하여도 서버는 이전에 접속했던 사용자가 그 사용자인지 알지 못한다.

따라서 로그인 화면에서 아이디, 패스워드를 입력하여 사용자 인증 과정을 거친 이후에 재차 웹사이트에 접근하면 로그인 상태임을 인식(유지)할 수 없으므로 매번 사용자 인증 과정을 반복해야 하는 문제가 발생한다.

### 1.2 Cookie & Session

http 프로토콜의 상태 비유지(stateless) 문제를 보완하여 클라이언트와 서버 간의 논리적 연결을 위한 방법에는 ```Session``` 과 ```Cookie``` 가 있다.

쿠키와 세션 내용정리 : https://github.com/sonicce99/TIL/blob/main/TMI/2022.01.11.md

쿠키는 max 4kb 의 텍스트 파일로서 세션에 비해 보안에 취약하다. 따라서 아이디와 비밀번호를 쿠키에 저장하는 방식은 피해야한다.

#### Cookie-Based Session

쿠키에는 Session ID 만을 저장하고 전송된 Session ID를 사용하여 Session에 저장된 정보를 사용하는 방법이다.

***

## Node.js (Express) 와 MySQL 연동

- MySQL 내용정리 : https://github.com/sonicce99/TIL/blob/main/TMI/2021.12.13.md

MySQL 은 AMP (Apache-MySQL_PHP) 플랫폼의 데이터베이스 구성체로 작동한다.

### 1. AMP ?

  1. Apache (웹서버)

  아파치와 같은 웹 서버는 사용자의 웹 브라우저에게 요청을 받으며 해당 요청에 대해 응답 및 제공을 해주는 역할을 담당한다.

  2. PHP (웹 프로그래밍 언어)

  Personal Home Page의 약자로 웹 프로그래밍 언어로서 서버에서 실행되는 언어를 말한다. PHP는 서버에서 해석하여 HTML 코드로 만들어 브라우저에 전달하는 형식이다. PHP는 Apache 웹 서버와 연동하여 동작하며 PHP는 .php 파일을 Apache 는 HTML 파일을 처리한다.

  3. MySQL (데이터베이스)

<img width="600" alt="스크린샷 2022-01-11 오후 11 51 03" src="https://user-images.githubusercontent.com/87749134/148965259-7bee8b2a-3b14-4f48-9890-a6c5be565ad5.png">

APM의 구동원리

> 1. Client가 인터넷 창에서 URL을 입력하여 원하는 정보를 서버에 요청

> 2. 서버의 아파치 프로그램은 승인 (80번 포트로 웹서버에 요청 / 웹서버는 사용자에게 홈페이지 정보 HTML, CSS를 날려줌)

> 3. 사용자가 로그인 요청이나 다른 정보 요청하면 PHP 스크립트 실행

> 4. MySQL에 쿼리 질의 -> MySQL은 저장된 데이터를 DB에서 가져와 가져온 데이터와 PHP 코드를 모두 HTML 형태로 변경하고, 해당 HTML을 아파치에 전송

> 5. 아파치는 완성된 HTML 파일을 클라이언트 측의 컴퓨터 웹 브라우저에 전달한다.

***

### 실행

Node.js (Express) 와 MySQL 연동을 위한 모듈 중 대표적인 ```mysql``` 에 대해 알아본다.

```javascript
const mysql      = require('mysql');
const db = mysql.createConnection({
  host     : 'localhost',
  user     : '< MySQL username >',
  password : '< MySQL password >',
  database : 'my_db'
});

db.connect();

↓ 마이바티스 미사용 시

db.query('SELECT * from Users', (error, rows, fields) => {
  if (error) throw error;
  console.log('User info is: ', rows);
});

db.end();

↓ 마이바티스 사용 시

// //질의문 형식
// var format = { language: 'sql', indent: '  ' };
//
// //첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.
// var query = mybatisMapper.getStatement('BoardMapper', 'insertProduct', param, format);
//
// console.log(query);  //해당쿼리가 조합된 것을 볼 수 있다.
//
// db.query(query, function (error, results, fields) {  //조회
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(results);
//     res.send(results);
//   }
// });
```

mysql 모듈을 통해서 AWS 의 내 데이터베이스와 createConnection 을 한다. 마이바티스를 통해 query 문을 작성하고 AWS DB 로 쿼리문을 날려준다.


***

# bootstrap

## 사용

- react bootstrap // react 전용

- vue bootstrap // vue 전용


### npm (react Version)

##### button

```
  import Button from 'react-bootstrap/Button';
```

> button Component 가져오기

##### css

```
  import 'bootstrap/dist/css/bootstrap.min.css';
```

##### App.js

```
  <>
    <Button variant="primary">Primary</Button>{' '}
    <Button variant="secondary">Secondary</Button>{' '}
    <Button variant="success">Success</Button>{' '}
    <Button variant="warning">Warning</Button>{' '}
    <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
    <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
    <Button variant="link">Link</Button>
  </>
```

***


### CDN (vue, react 버전은 따로 홈페이지 가서 긁어올것.)

- bootstrap 을 사용하기 위해서는 CSS 파일과 JS 파일 2가지를 가져와야 한다.

##### css

```
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
```


##### JS

```
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
```


=> CDN 방식은 외부에서 파일을 받아오는 것이기 때문에 버튼의 색상 같은 것들을 마음대로 수정 할 수가 없다. npm 방식은 커스터마이징 가능.

***

### npm 설치 방법

- npm install bootstrap@next


하고

main.scss , main.js 에 각각 import 를 해주어야 한다. scss는 import 할 때 @import 해야함.

***


### 버튼 생성하기


##### 기본 버튼 생성

<img width="600" alt="스크린샷 2021-10-27 오후 1 48 56" src="https://user-images.githubusercontent.com/87749134/139001848-8610deb9-8458-419b-b76b-d8c9694b17f0.png">


##### 버튼 그룹화 하기

<img width="600" alt="스크린샷 2021-10-27 오후 1 49 12" src="https://user-images.githubusercontent.com/87749134/139001850-a8e01454-ffbb-4cb0-9ec5-ae4731a480d8.png">


##### 버튼 아웃라인 그리기

<img width="600" alt="스크린샷 2021-10-27 오후 1 49 51" src="https://user-images.githubusercontent.com/87749134/139001852-71cffd0a-9c94-4fca-a13b-4947e704468e.png">


##### 버튼 사이즈 조절


<img width="600" alt="스크린샷 2021-10-27 오후 1 54 15" src="https://user-images.githubusercontent.com/87749134/139002165-4ab883ed-4290-40a8-9bc1-246113325e36.png">


##### 버튼 가능, 불가능 상태 만들기

<img width="600" alt="스크린샷 2021-10-27 오후 1 54 27" src="https://user-images.githubusercontent.com/87749134/139002170-aed23d6d-5566-4240-8639-bdba5a653f36.png">

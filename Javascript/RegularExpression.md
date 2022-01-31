<h1>정규 표현식</h1>



```
  특정문자 제거            : str.replace(/\-/g,'');
  앞의 공백 제거           : str.replace(/^\s+/,'');
  뒤의 공백 제거          : str.replace(/\s+$/,'');
  앞뒤 공백 제거          : str.replace(/^\s+|\s+$/g,'');
  문자열 내의 공백 제거  : str.replace(/\s/g,'');
  개행 제거                : str.replace(/\n/g,'');
  엔터 제거                : str.replace(/\r/g,'');
  0 제거                   : str.replace(/[^(1-9)]/gi,"");
```


<h3>정규식에서 문자가 의미하는 뜻</h3>

```
[a-z] : a ~ z 사이의 문자를 찾음

[abc] : a, b, c중 하나를 찾음

[^abc] : a, b, c를 제외한 문자를 찾음



. : 개행 문자를 제외한 모든 단일 문자와 대응됩니다
    예를 들어, /.n/는 "nay, an apple is on the tree"에서 'an'과 'on'에 대응되지만, 'nay' 에는 대응되지 않습니다.


a+ : a가 1개 이상을 의미함

a* : a가 0개 또는 그 이상을 의미함

x(?=y) : 오직 'y'가 뒤따라오는 'x'에만 대응됩니다. 이것은 lookahead 라고 불립니다.

x(?!y) : 'x'뒤에  'y'가 없는경우에만 'x'에 일치합니다. 이것은 negated lookahead 라고 불립니다.



\s : 공백 문자를 찾음(스페이스, 탭 등)

\S : 공백이 아닌 문자를 찾음

\d : 숫자를 찾음 [0-9]

\D : 숫자가 아닌 문자를 찾음  [^0-9]

\w : 알파벳 영문과 숫자와 언더바 _ 기호를 찾음 [A-Za-z0-9_]

\W : 알파벳 영문과 숫자와 언더바 _ 기호가 아닌 것을 찾음 [^A-Za-z0-9_]

\r : 엔터

\n : 개행  

t : 탭 공간을 찾음

v : 버티칼 탭 공간을 찾음



g : 검색범위를 전역으로 확장

i : 대소문자를 구분하지 않음

gi : 검색 범위를 전역으로 확대하면서 대소문자를 구분하지 않음

m : 여러줄을 동시에 매칭함
```


<h3>메타 문자</h3>

```
정규표현식에서 일정한 의미를 가지고 쓰는 특수문자를 메타 문자라고 부른다.

^ : 문자열의 시작

$ : 문자열의 종료. 옵션에 따라 문장의 끝 또는 문서의 끝에 매치된다.

. : 임의의 한 문자

[]: 문자 클래스. 문자 클래스 안에 들어가 있는 문자는 그 바깥에서 하나의 문자로 취급된다.

| : or를 나타냄

? : 앞 문자가 없거나 하나 있음

+ : 앞 문자가 하나 이상임

* : 앞 문자가 0개 이상임

{n} : 앞 문자가 n개 존재함.   ex) /^\d{6}$/  => 맨 앞에 숫자 6개가 있고 끝남.

{n,m} : 앞 문자가 n개 이상 m개 이하. {0,1} 은 ?와 같은 의미다.

{n,} : 앞 문자가 n개 이상. 위의 형태에서 m이 생략된 형태이다. {0,} 이면 *와 같고 {1,} 이면 +와 같은 의미이다.

() : 하나의 패턴구분자 안에 서브 패턴을 지정해서 사용할 경우 괄호로 묶어주는 방식을 사용한다.

빈 문자열인지 : /^$/
```



<h3>패턴변경자</h3>

패턴구분자가 끝나면 그 뒤에 쓰는 것으로, 패턴에 일괄적으로 변경을 가할 때 사용한다.


```
i : 패턴을 대소문자 구분 없이 검사한다. 이 변경자를 사용할 경우 [a-z]로만 검사해도 자동으로 [a-zA-Z]와

   같은 기능을 하게 된다. 가장 많이 쓰이는 패턴.

s : 임의의 한 문자를 가리키는 . 메타 문자에 개행 문자(\n)도 포함시키도록 한다.

    이 변경자를 사용하면 .이 줄바꿈도 임의의 한 문자로 취급하여 찾는다.

m : 주어진 문자열에 줄바꿈이 있을 경우, 여러 줄로 취급하여 검사한다.

    (줄바꿈이 없다면 써도 의미가 없다.) 원래 정규표현식을 쓸 때 줄바꿈은 무시되는데,

    이걸 사용하면 줄바꿈을 적용해서 검사한다. 그리고 ^은 한 줄의 시작, $는 한 줄의 끝으로 의미가 달라진다.

x : 공백 문자를 찾지 않고 무시해 버린다. 단, 이스케이프(역슬래쉬하고 같이 쓸 경우)하거나

   문자 클래스 안에 있을 경우에는 이걸 써도 공백을 찾는다.
```

***

이름 관련 정규식

```
let reg_name1 = /^[가-힣]+$/; // 한글만
let reg_name2 = /^[a-zA-z]+$/; // 영문만
let reg_name3 = /^[a-z]+$/; // 영문 소문자만
let reg_name4 = /^[A-Z]+$/; // 영문 대문자만
let reg_name5 = /^[가-힣a-zA-Z]+$/; // 한글 + 영문만
```

아이디 관련 정규식

```
let reg_id1 = /^[a-z0-9_-]{4,20}$/; // 소문자 + 숫자 + 언더바/하이픈 허용 4~20자리
let reg_id2 = /^[A-Za-z]{1}[A-Za-z0-9_-]{3,19}$/ // 반드시 영문으로 시작 숫자+언더바/하이픈 허용 4~20자리
```

비밀번호 관련 정규식

```
let reg_pw1 = /^[a-z0-9_-]{6,18}$/; // 단순 6~18자리
let reg_pw2 = /(?=.*[a-zA-ZS])(?=.*?[#?!@$%^&*-]).{6,24}/; // 문자와 특수문자 조합의 6~24 자리
let reg_pw3 = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/; // 문자, 숫자 1개이상 포함, 8자리 이상
```

이메일 관련 정규식

```
let reg_email =/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/; // 길이까지 확실한 검증
```


전화번호 관련 정규식

```
let reg_num = /^[0-9]{8,13}$/; // 전화번호 숫자만
let reg_mobile = /^\d{3}-\d{3,4}-\d{4}$/; // 휴대폰 번호
let reg_tel = /^\d{2,3}-\d{3,4}-\d{4}$/; // 일반 전화 번호
```


주민등록번호 정규식

```
let reg_num = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/;
```


URL 관련 정규식

```
let reg_url = /^(https?:\/\/)?([a-z\d\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/; // URL 검사식
```


<h3>2021.09.23 추가 내용</h3>



#. 정규표현식 활용 예시
먼저 아래 문장을 정규표현식으로 주물러 보겠습니다.

"대나무 빨대 a급 제품은 10개 남아있습니다. 010-1111-2222 로 Call Me~!"


```
  /대/ :  '대'를 '하나'만 찾는다.

  => 대나무 빨대 a급 제품은 10개 남아있습니다. 010-1111-2222 로 Call Me~!
```



```
  /대/g: '대'를 '모두' 찾는다

  => 대나무 빨대 a급 제품은 10개 남아있습니다. 010-1111-2222 로 Call Me~!

```




```
  /대나무 빨대/: '대나무 빨대'를 찾는다.

  => 대나무 빨대 a급 제품은 10개 남아있습니다. 010-1111-2222 로 Call Me~!
```



```
  /[대a0]/g: "대", "a", 0 중에 하나를 모두 찾는다.

  => 대나무 빨대 a급 제품은 10개 남아있습니다. 010-1111-2222 로 Call Me~!

  * 대괄호[]는 OR의 기능을 합니다.
```




```
  /[0-9]/g : '숫자0~9'를 모두 찾는다.

  => 대나무 빨대 a급 제품은 10개 남아있습니다. 010-1111-2222 로 Call Me~!
```



https://curryyou.tistory.com/234

```
const s = '01012345678'
s.replace(/\d(?=\d{4})/g, "*")

//expected output : '*******5678'    // x(?=y) 참조  
```


## 그 외 정규표현식 관련 함수에서 내가 몰랐던 사항


***

#### match

```javascript
  const a = '1S'

  const b = a.match(/\dS/);
  const c = a.match(/(\d)S/);
  const d = a.match(/\d(S)/);
  const e = a.match(/(\d)(S)/);


  console.log(b,c,d,e)

  // expected output :
(1) ["1S"]
(2) ["1S", "1"]
(2) ["1S", "S"]
(3) ["1S", "1", "S"]
```

알아둬야 할 점 : 기본 졍규식과 똑같은데 괄호가 있을 경우 해당 조건을 만족하는 전체 문자열과 괄호안을 만족하는 문자열이 같이 반환됨.

***
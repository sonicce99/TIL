# MySQL 내용정리  

- 유용한 유튜브 : https://www.youtube.com/watch?v=dgpBXNa9vJc  

- 유용한 페이지 : https://www.yalco.kr/lectures/sql/  

MySQL 은 가장 널리 쓰이는 RDBMS이다. (Relational Database Management System)

MySQL을 비롯한 다수의 데이터베이스들은 SQL (Structured Query Language) 이라는 방식을 사용한다.

## SQL?  

엑셀과 같은 표 형태의 데이터베이스에 정보를 넣고 빼고 조작하고 사용하는데 사용되는게 구조화 질의 언어(SQL) 이다.

<img width="700" alt="스크린샷 2021-12-13 오후 1 18 00" src="https://user-images.githubusercontent.com/87749134/145751760-9dcd34a5-9afa-4715-9820-ef70321bd393.png">

> 관계형은 SQL , 비관계형은 NoSQL 데이터베이스라고 한다.

- MySQL 연습해보기 : https://www.w3schools.com/mysql/trymysql.asp?filename=trysql_select_all

***  


### 전반적 기능 살펴보기

🌟 MySQL 은 대소문자 구분을 하지 않음.   

1. 테이블의 모든 내용 보기 (*)

> SELECT * FROM Customers;

2. 원하는 열만 골라서 보기 (여러개 선택 가능)

> SELECT CustomerName, ContactName, Country FROM Customers;


3. 원하는 행만 골라서 보기

> SELECT * FROM Orders
  WHERE EmployeeID = 3;

<img width="800" alt="스크린샷 2021-12-13 오후 1 46 09" src="https://user-images.githubusercontent.com/87749134/145753913-5120793e-3da2-487d-8325-9377f3a7e451.png">


> SELECT * FROM OrderDetails
  WHERE Quantity < 5;

4. 데이터 오름차순, 내림차순 설정하기 (ASC: 오름차순(default), DESC: 내림차순)  

> SELECT * FROM Customers
  ORDER BY ContactName;

> SELECT * FROM OrderDetails
  ORDER BY ProductID ASC, Quantity DESC;  


5. 원하는 만큼만 데이터 가져오기 (page 등에 사용됨 첫번째 페이지, 2번째 페이지... )

- 데이터 10개만 가져오기

> SELECT * FROM Customers
  LIMIT 10;

- 데이터 1번째 부터 10번째 까지 가져오기

> SELECT * FROM Customers
  LIMIT 0, 10;

- 데이터 31번째 부터 40번째 까지 가져오기

> SELECT * FROM Customers
  LIMIT 30, 10;

6. 원하는 별명으로 데이터 가져오기

> SELECT
  CustomerId AS ID,
  CustomerName AS NAME,
  Address AS ADDR
  FROM Customers;

<img width="800" alt="스크린샷 2021-12-13 오후 2 07 28" src="https://user-images.githubusercontent.com/87749134/145755622-2d31148e-1b2d-4ad4-85a7-8dfc3510ab0d.png">  

7. 모두 활용해보기

Customers 중에 CustomerID, CustomerName, City, Country 를 각각 아이디, 고객명, 도시, 국가로 가져오고
City 는 London or Mexico 에 살고 CustomerName 는 오름차순으로 가져오되
데이터의 갯수는 5개만 가져온다.

> SELECT
  CustomerID AS '아이디',
  CustomerName AS '고객명',
  City AS '도시',
  Country AS '국가'
  FROM Customers
  WHERE
  City = 'London' OR Country = 'Mexico'
  ORDER BY CustomerName
  LIMIT 0, 5;


***  

### 연산자 정리

#### + , - , * , /, %  

> SELECT 1 + 2;

<img width="400" alt="스크린샷 2021-12-13 오후 2 17 49" src="https://user-images.githubusercontent.com/87749134/145756539-a6cf7663-40f1-4bda-b091-7d10d441a403.png">

> SELECT 5 - 2.5 AS DIFFERENCE;

<img width="400" alt="스크린샷 2021-12-13 오후 2 17 57" src="https://user-images.githubusercontent.com/87749134/145756542-fb00607e-e256-47d0-b451-7cf7c9d8ad01.png">


🌟 MySQL 에서 (문자열 + 숫자) or (문자열 * 숫자) 하면 문자열은 숫자 0으로 처리함.    

> SELECT 'ABC' + 3;

<img width="400" alt="스크린샷 2021-12-13 오후 2 21 17" src="https://user-images.githubusercontent.com/87749134/145756790-7451cf9e-bb0b-4905-b5f7-dcd743f66ca6.png">


🌟 MySQL 에서 문자열 이더라도 'ABC' 가 아니라 숫자형 문자열 일 경우 "3" 이면 숫자로 변환하여 처리

> SELECT '1' + '002' * 3;

<img width="400" alt="스크린샷 2021-12-13 오후 2 24 14" src="https://user-images.githubusercontent.com/87749134/145757010-9d4b2384-e24d-4f04-9e7d-eabb4eae31aa.png">


> SELECT
  OrderID, ProductID,
  OrderID + ProductID
  FROM OrderDetails;

<img width="500" alt="스크린샷 2021-12-13 오후 2 26 21" src="https://user-images.githubusercontent.com/87749134/145757188-84a2acf8-6571-47e4-ac26-3719517c5700.png">  


#### 참/ 거짓 (TRUE, FALSE, 1, 0, NOT, !)  

> SELECT True, False

<img width="577" alt="스크린샷 2021-12-13 오후 2 29 29" src="https://user-images.githubusercontent.com/87749134/145757486-f322884c-5a66-48b9-abc8-a6e0aab0f506.png">


> SELECT !TRUE, NOT 1, !FALSE, NOT FALSE;

<img width="577" alt="스크린샷 2021-12-13 오후 2 31 12" src="https://user-images.githubusercontent.com/87749134/145757609-0b69f415-f03e-4d75-be7a-84cd0f03d212.png">

> SELECT 0 = TRUE, 1 = TRUE, 0 = FALSE, 1 = FALSE;

<img width="500" alt="스크린샷 2021-12-13 오후 2 33 23" src="https://user-images.githubusercontent.com/87749134/145757793-dba7d08a-699e-4fac-a320-224b4e1e0d98.png">


#### IS, IS NOT

- IS : 양쪽이 모두 TRUE or FLASE

- IS NOT : 한쪽은  TRUE, 한쪽은 FALSE


> SELECT (TRUE IS FALSE) IS NOT TRUE;

<img width="500" alt="스크린샷 2021-12-13 오후 2 37 39" src="https://user-images.githubusercontent.com/87749134/145758177-cf5cf61e-fb81-4ae3-92d1-876dfe1b1a89.png">

#### AND, OR     

> SELECT * FROM OrderDetails
  WHERE
  ProductId = 20
  AND (OrderId = 10514 OR Quantity = 50);


<img width="500" alt="스크린샷 2021-12-13 오후 2 41 43" src="https://user-images.githubusercontent.com/87749134/145758605-3cabbf71-831c-4614-bba2-73ddea6f8e3b.png">  


#### =, !=, <>, >, <, >=, <=

- = : 양쪽 값이 같음 🚫(== 아님)

- != , <> : 양쪽 값이 다름


#### BETWEEN, NOT BETWEEN

- BETWEEN : 두 값 사이에 있음

- NOT BETWEEN : 두 값 사이가 아닌 곳에 있음  


> SELECT * FROM OrderDetails
  WHERE ProductID BETWEEN 1 AND 4;  (4도 포함됨)  

<img width="500" alt="스크린샷 2021-12-13 오후 2 50 26" src="https://user-images.githubusercontent.com/87749134/145759430-598ffac7-7541-4fd4-a8cd-39e07c9c3692.png">



#### IN(...), NOT IN(...)

- IN(...) : 괄호 안의 값 중에 있음

- NOT IN(...) : 괄호 안의 값 중에 없음  


> SELECT 1 + 2 IN (2, 3, 4)

expected output : 1

> SELECT * FROM Customers
  WHERE City IN ('Torino', 'Paris', 'Portland', 'Madrid')

<img width="800" alt="스크린샷 2021-12-13 오후 2 57 51" src="https://user-images.githubusercontent.com/87749134/145760143-f36c0aa7-569b-461b-a5f3-254d166f0fba.png">  


#### LIKE (특정 문단에서 해당 단어를 포함하는게 있는지 없는지 찾을 때 유용함)  

- Like "...%..." : %위치에 0~N개의 문자 있는지 없는지

- Like "..._..." : _ 갯수만큼의 문자가 있는지 없는지

> SELECT
  'HELLO' LIKE 'hel%',
  'HELLO' LIKE 'H%',
  'HELLO' LIKE 'H%O',
  'HELLO' LIKE '%O',
  'HELLO' LIKE '%HELLO%',
  'HELLO' LIKE '%H' => H로 문자가 끝난다는 뜻 (거짓)
  'HELLO' LIKE 'L%' => L로 문자가 시작한다는 뜻 (거짓)  

<img width="500" alt="스크린샷 2021-12-13 오후 3 02 26" src="https://user-images.githubusercontent.com/87749134/145760640-91605589-1c33-4725-816d-b6a09ae53082.png">


> SELECT
  'HELLO' LIKE 'HEL__',
  'HELLO' LIKE 'h___O',
  'HELLO' LIKE 'HE_LO',
  'HELLO' LIKE '_____',
  'HELLO' LIKE '_HELLO',
  'HELLO' LIKE 'HEL_',
  'HELLO' LIKE 'H_O'

<img width="500" alt="스크린샷 2021-12-13 오후 3 02 49" src="https://user-images.githubusercontent.com/87749134/145760653-77a56db6-ccc4-42e1-af40-6ff5687b51c3.png">  


> SELECT * FROM Employees
  WHERE Notes LIKE '%economics%'

<img width="800" alt="스크린샷 2021-12-13 오후 3 09 34" src="https://user-images.githubusercontent.com/87749134/145761176-87a2ee33-9958-40f0-a0eb-765da55f6324.png">  



***


### 데이터 삽입

- INSERT INTO

```MySQL
-- 여러 행을 한 번에 입력 가능
INSERT INTO people
  (person_id, person_name, age, birthday)
  VALUES
    (4, '존 스미스', 30, '1991-03-01'),
    (5, '루피 D. 몽키', 15, '2006-12-07'),
    (6, '황비홍', 24, '1997-10-30');
```

```MySQL
-- 모든 컬럼에 값 넣을 때는 컬럼명들 생략 가능
INSERT INTO people
  VALUES (2, '전우치', 18, '2003-05-12');  
```

```MySQL
-- 일부 컬럼에만 값 넣기 가능 (NOT NULL은 생략 불가)
INSERT INTO people
  (person_id, person_name, birthday)
  VALUES (3, '임꺽정', '1995-11-04');
```

### 테이블 생성시 제약 넣기

```MySQL
CREATE TABLE people (
  person_id INT AUTO_INCREMENT PRIMARY KEY,
  person_name VARCHAR(10) NOT NULL,
  nickname VARCHAR(10) UNIQUE NOT NULL,
  age TINYINT UNSIGNED,
  is_married TINYINT DEFAULT 0
);
```

- AUTO_INCREMENT (AI) : 새 행 생성시마다 자동으로 1씩 증가

- PRIMARY KEY (PK) : 중복 입력 불가, NOT NULL 🌟(각 행이 절대적으로 독립해야함, 보통 AUTO_INCREMENT와 함께 사용)  

- UNIQUE (UQ) : 중복 입력 불가

- NOT NULL (NN) : 빈 값 입력 불가

- UNSIGNED (UN) : 양수만 가능

- DEFAULT : 값이 없을 시 기본값


🌟🚫 PRIMARY KEY 에 AUTO_INCREMENT 가 되어 있으면 값을 직접 넣어주지 않는다.

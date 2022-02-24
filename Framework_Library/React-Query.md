# React-Query

React-Query는 React앱에서 비동기 로직을 쉽게 다루게 해주는 라이브러리입니다.

- 유용한 유튜브 : https://www.youtube.com/watch?v=MArE6Hy371c  

## 핵심 Core 컨셉

- Queries (보통 GET으로 받아올 대부분의 API에 사용)

- Mutations (데이터 생성, 수정, 삭제할 때 사용)    

- Query Invalidation


## Query

useQuery(key, function, options)  

<img width="600" alt="스크린샷 2022-02-24 오후 8 16 46" src="https://user-images.githubusercontent.com/87749134/155514351-ed1a0a22-b1aa-45ea-99d4-1b90114f38f8.png">

↓ Info에 반환되는 값 종류

<img width="600" alt="스크린샷 2022-02-24 오후 8 16 56" src="https://user-images.githubusercontent.com/87749134/155514360-73799ccf-3e8f-4a5f-bd1f-1664c0749ec7.png">

> 리덕스에서 일일이 적어주던 isLoading, error 등이 다 기본적으로 반환해줌.

↓ Options에서 자주쓰는 동작들

<img width="600" alt="스크린샷 2022-02-24 오후 8 20 51" src="https://user-images.githubusercontent.com/87749134/155515060-9b230d8d-756b-4586-86bc-3c1fd516e224.png">

***

## Mutations

<img width="600" alt="스크린샷 2022-02-24 오후 8 48 07" src="https://user-images.githubusercontent.com/87749134/155518428-10a30f33-4bb7-48a0-88d4-5ebf1bf4589a.png">

↓ useMutaions에서 반환되는 값 종류  

<img width="600" alt="스크린샷 2022-02-24 오후 8 49 02" src="https://user-images.githubusercontent.com/87749134/155518577-bbc29ad6-3910-4cf9-9796-acff83a340fb.png">

↓ Options에서 자주쓰는 동작들

<img width="600" alt="스크린샷 2022-02-24 오후 8 56 14" src="https://user-images.githubusercontent.com/87749134/155519489-22ba93b6-0f41-407b-b70f-a1e2e042e8ab.png">

❗️ Optimistic update ?

ex) 페이스북에서 좋아요를 누르면 Api 통신을 하는데 일단 성공할것이라고 보고 UI를 먼저 업데이트 한다. 만약 통신이 잘 되지 않았다면 롤백 할 수 있다.  

***

## Query Invalidation

<img width="600" alt="스크린샷 2022-02-24 오후 9 00 17" src="https://user-images.githubusercontent.com/87749134/155520035-c722440d-3619-4f13-bb00-4196c0707167.png">


***

## 좋은점

- 서버상태 관리 용이, 직관적인 API 호출 코드

- API 처리에 관한 각종 인터페이스 및 옵션 제공

- Client Store 가 FE에서 정말로 필요한 전역상태만 남아 Store 답게 사용됨(보일러플레이트 코드 매우 감소)

- devtool 제공으로 원할한 디버깅

- Cache 전략 필요할 때 아주 좋음  

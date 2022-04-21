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


***

## 사용법  

```javascript
import { QueryClient, QueryClientProvider } from 'react-query'

 // Create a client
 const queryClient = new QueryClient()

 function App() {
   return (
     // Provide the client to your App
     <QueryClientProvider client={queryClient}>
       <Todos />
     </QueryClientProvider>
   )
 }
 ```

 ```javascript
 import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
  } from 'react-query'
  import { getTodos, postTodo } from '../my-api'
 // Create a client
 const queryClient = new QueryClient()

 function Todos() {
   // Access the client
   const queryClient = useQueryClient()

   // Queries
   const query = useQuery('todos', getTodos)

   // Mutations
   const mutation = useMutation(postTodo, {
     onSuccess: () => {
       // Invalidate and refetch
       queryClient.invalidateQueries('todos')
     },
   })

   return (
     <div>
       <ul>
         {query.data.map(todo => (
           <li key={todo.id}>{todo.title}</li>
         ))}
       </ul>

       <button
         onClick={() => {
           mutation.mutate({
             id: Date.now(),
             title: 'Do Laundry',
           })
         }}
       >
         Add Todo
       </button>
     </div>
   )
 }

 render(<App />, document.getElementById('root'))
```

Mutations는 key값이 없다. 바로 요청을 보내고 만약 onSuccess하면 기존의 useQuery의 key값이였던 todos를 Invalidate (무효화) 하고 새로운 값으로 refetch한다.
만약 onSuccess가 없다면 서버에 새로운으로 전송은 했지만 바로 새로운 값으로 업데이트 되지는 않는다.
하지만 onSuccess를 작성해 놓고 값이 성공적으로 바뀌었다면 바로 useQuery로 데이터를 가져온다.

***

## Devtool

이쁜 꽃모양 Devtool 생성!  

initialIsOpen 이 false이면 Devtool이 자동으로 켜지지 않고 내가 꽃모양을 클릭해야 켜짐.

<img src="https://user-images.githubusercontent.com/87749134/164444827-4298c5ff-17ca-4576-a623-807ef2ef0fac.png" width="500px" />

```javascript
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

***

## Important Defaults

- Query instances via useQuery or useInfiniteQuery by default consider cached data as stale.

> useQuery 또는 useInfiniteQuery를 통한 쿼리 인스턴스는 기본적으로 캐시된 데이터를 오래된 것으로 간주합니다.

    > To change this behavior, you can configure your queries both globally and per-query using the staleTime option. Specifying a longer staleTime means queries will not refetch their data as often

- If you see a refetch that you are not expecting, it is likely because you just focused the window and React Query is doing a refetchOnWindowFocus. During development, this will probably be triggered more frequently, especially because focusing between the Browser DevTools and your app will also cause a fetch, so be aware of that.

>  예상하지 못한 refetch가 일어난다면, window를 focus 했거나, React-Query가 refetchOnWindowFocus를 하고 있을 수 있습니다.

    > To change this functionality, you can use options like refetchOnMount, refetchOnWindowFocus, refetchOnReconnect and refetchInterval.

- Query results that have no more active instances of useQuery, useInfiniteQuery or query observers are labeled as "inactive" and remain in the cache in case they are used again at a later time.
By default, "inactive" queries are garbage collected after 5 minutes.

> useQuery, useInfiniteQuery, query observers에서 쓰고 더 이상 쓰지 않는 결과들은 inactive 한 라벨이 붙게 되고, 나중에 다시 쓰일 수 있으므로 캐시에 남아있습니다. 기본적으로 inactive한 쿼리들은 5분 후에 garbage collected 됩니다.

    > To change this, you can alter the default cacheTime for queries to something other than 1000 * 60 * 5 milliseconds.

- Queries that fail are silently retried 3 times, with exponential backoff delay before capturing and displaying an error to the UI.

> 실패한 Query 들은 에러를 보여주기 전에 자동으로 3번 재시도 됩니다.

    > To change this, you can alter the default retry and retryDelay options for queries to something other than 3 and the default exponential backoff function.

- Query results by default are structurally shared to detect if data has actually changed and if not, the data reference remains unchanged to better help with value stabilization with regards to useMemo and useCallback.

> 기본적으로 Query 결과는 데이터가 바뀌었는지 아닌지 검사합니다. 바뀌지 않았다면 데이터의 참조는 그대로 유지되게 됩니다.

***

## Query keys

At its core, React Query manages query caching for you based on query keys. Query keys can be as simple as a string, or as complex as an array of many strings and nested objects. As long as the query key is serializable, and unique to the query's data, you can use it!

> 핵심적으로 React Query는 쿼리 키를 기반으로 쿼리 캐싱을 관리합니다. 쿼리 키는 문자열처럼 단순할 수도 있고 배열처럼 복잡할 수도 있습니다. 쿼리 키가 직렬화 가능하고 쿼리 데이터에 고유하다면 사용할 수 있습니다!


```javascript
// A list of todos
useQuery('todos', ...) // queryKey === ['todos']

// Something else, whatever!
useQuery('somethingSpecial', ...) // queryKey === ['somethingSpecial']
```

```javascript
useQuery(['todo', 5], ...)
// queryKey === ['todo', 5]

useQuery(['todo', 5, { preview: true }], ...)
// queryKey === ['todo', 5, { preview: true }]

useQuery(['todos', { type: 'done' }], ...)
// queryKey === ['todos', { type: 'done' }]
```

***

## Query functions

```javascript
// 모두 같음.  
useQuery(['todos'], fetchAllTodos)
useQuery(['todos', todoId], () => fetchTodoById(todoId))
useQuery(['todos', todoId], async () => {
   const data = await fetchTodoById(todoId)
   return data
 })
 // queryKey에서 직접 키를 뽑아서 쓸 수 도 있다. queryKey[1] 은 todoId를 의미  
useQuery(['todos', todoId], ({ queryKey }) => fetchTodoById(queryKey[1]))
```

***

## Dependent Queries

- enabled에 있는 userId 값이 있다면 해당 쿼리가 실행됨. 없으면 실행 안됨. 

```javascript
// Get the user
 const { data: user } = useQuery(['user', email], getUserByEmail)

 const userId = user?.id

 // Then get the user's projects
 const { isIdle, data: projects } = useQuery(
   ['projects', userId],
   getProjectsByUser,
   {
     // The query will not execute until the userId exists
     enabled: !!userId,
   }
 )

 // isIdle will be `true` until `enabled` is true and the query begins to fetch.
 // It will then go to the `isLoading` stage and hopefully the `isSuccess` stage :)
```

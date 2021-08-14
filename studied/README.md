- 2021.08.14 (토)

    const j= a.reduce((acc, _, i) => acc += a[i] * b[i], 0)

reduce 함수에 배열의 값은 상관 없고 인덱스만 사용해서 계산을 할 수도 있다. 필요가 없기에 _ 표시를 한것.

<hr/>

   var a1c = answers.filter((a,i)=> a === a1[i%a1.length]).length

filter 함수에도 인덱스 값도 넣을 수 있어서 인덱스끼리도 비교해서 필터 할 수 있다.
  

<h2>나의 문제 풀이</h2>

    function solution(answers) {

      const array = [[1,2,3,4,5],[2,1,2,3,2,4,2,5],[3,3,1,1,2,2,4,4,5,5]]
      const final = []
      const a= []
      const b= []
      array.forEach((a) => {
          let sum = 0;
          for(let i=0; i<answers.length;i++) {
              if(answers[i] === a[i%(a.length)]) {
                  sum+=1;
              }
          }
          final.push(sum)
      })
      const g = final.reduce((a,c) => Math.max(a,c),0);
      let k = final.indexOf(g);
      while(k != -1) {
        a.push(k);
        k = final.indexOf((g), k + 1)
      }
      a.sort((a,b) => a-b);
      a.forEach((a) => b.push(a+1))


      return b
    }


<h2>고수 문제 풀이</h2>

    function solution(answers) {

      var answer = [];
      var a1 = [1, 2, 3, 4, 5];
      var a2 = [2, 1, 2, 3, 2, 4, 2, 5]
      var a3 = [ 3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

      var a1c = answers.filter((a,i)=> a === a1[i%a1.length]).length;
      var a2c = answers.filter((a,i)=> a === a2[i%a2.length]).length;
      var a3c = answers.filter((a,i)=> a === a3[i%a3.length]).length;
      var max = Math.max(a1c,a2c,a3c);

      if (a1c === max) {answer.push(1)};
      if (a2c === max) {answer.push(2)};
      if (a3c === max) {answer.push(3)};


      return answer;
    }

- 보완점: filter 함수에는 인덱스 값도 넣을 수 있어서 인덱스끼리도 비교해서 필터 할 수 있다는것을 배움

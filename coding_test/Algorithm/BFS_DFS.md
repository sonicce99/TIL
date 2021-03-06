<h1>Javascript로 트리, BFS, DFS 구현하기</h1>


<h3>트리</h3>

트리는 계층이 존재한다.
트리는 기본적을 부모-자식 관계로 부터 출발한다. 부모와 자식은 각각 '노드' 라고 불리우는데 트리를 구성하는 가장 기본 단위가 된다. 노드는 2가지 정보를 담고 있는데

1. 다른 노드와의 차별점을 두는 데이터

2. 자식들과의 관계를 담고 있는 정보


컴퓨터 메모리 구조 안에서 부모는 자식노드들의 **주소**를 갖고 있는다. 우리가 항상 부모님과의 관계를 증명하기 위해 따라다닐 필요가 없듯이, 메모리에서도 같은 노드안에 부모와 자식 노드의 데이터가 같이 저장되는 것은 아니다. *(데이터를 가지고 있지 않고 주소만 가지고 있는것)*

그저 핸드폰 번호만 알고 있으면, 전화를 통해서 연결 될 수 있다.




***


<h3>BFS (Breadth First Search)</h3>

<h3>DFS (Depth First Search)</h3>


**트리를 순회하는 방법**

- 너비 우선 탐색 (BFS) => 층 우선 탐색

- 깊이 우선 탐색 (DFS)


![IMG_5787](https://user-images.githubusercontent.com/87749134/134756248-0e20f801-d3cf-4f17-8aef-94758918973d.JPG)


***





*BFS*

트리의 가장 최상위 부모부터 자식들의 정보가 궁금하다.

예로 회사 사내 조식도에서 CEO부터 사원까지 층을 따라 사장, 부장, 대리 ... 이름을 쭉 나열하고 그 다음 평사원의 이름을 나열하면 된다. 탐색을 하는데 있어서 우선 순위가 **층**이 된다는 것이 핵심이다.




<img width="1036" alt="스크린샷 2021-09-28 오후 2 13 56" src="https://user-images.githubusercontent.com/87749134/135198527-c334663c-6cab-4066-ba81-f410c13c3994.png">





*DFS*

너비 우선 탐색은 **층**이 우선이 되었지만, 이번엔 깊이, 즉 자식들이 우선순위가 된다. 부모로부터 자식까지 아래로 쭉 훑고, 그 옆의 부모 노드로 방문이 넘어가게 된다.
아까 회사 조직도에서 BFS는 한 계급 (층)으로 이름을 나열했는데, DFS는 팀 단위라고 보면 좋을것 같다. 회사 조직도에서 사장 다음에 영업부서, 개발부서, 디자인부서가 있다고 한다면 , 각각의 부서에서는 부장-대리-사원이 있다. 영업부서의 부장-대리-사원, 개발부서의 부장-대리-사원, 디자인부서의 부장-대리-사원 순으로 이름이 나열될 것이다.


그래프에서 다른 노드를 방문하기 전에 하나의 노드를 깊게 파고들며 순회하는 검색 알고리즘이다.
최상위 노드에서 연결된 자식 노드를 모두 탐색한 후, 더 이상 자식 노드가 없을 때 인접한 상위 노드의 형제 노드를 방문한다. 해당 형제 노드에서도 자식노드를 탐색하고, 더 이상 자식노드가 없을 경우 다시 인접한 상위 형제의 노드를 방문하는 알고리즘이다.

아래 그림을 보면 최상위 루트 노드 A에서 B를 따라 자식노드를 탐색한 뒤, I를 가장 마지막에 탐색한다.



<img width="336" alt="스크린샷 2021-09-24 오후 9 35 36" src="https://user-images.githubusercontent.com/87749134/134675104-6a47219c-ac41-4c18-9eb7-bf17f400a2ed.png">



자바스크립트에서는 재귀 함수를 이용하여 DFS를 구현할 수 있다. 각각 노드의 자식 노드를 탐색하는 함수를 스택에 추가한 뒤, 더 이상 자식 노드가 없을 때 마지막에 추가된 자식 노드 먼저 실행 후 스택에서 제거하는 후입선출(LIFO) 방식이 이용된다.



<img width="1370" alt="스크린샷 2021-09-21 오후 9 50 55" src="https://user-images.githubusercontent.com/87749134/134675569-dab78235-b9c1-4317-9d0f-05d85cab098a.png">




***


<img width="713" alt="스크린샷 2021-09-21 오후 1 30 00" src="https://user-images.githubusercontent.com/87749134/134111800-a6ad79cd-d537-40ba-a1ad-3ac75e864b8a.png">
<img width="713" alt="스크린샷 2021-09-21 오후 1 30 13" src="https://user-images.githubusercontent.com/87749134/134111811-f248d889-6dde-4853-bd67-3c21ced77529.png">



***


**BFS**

```Javascript
  const graph = {
    A: ["B", "C"],
    B: ["A", "D"],
    C: ["A", "G", "H", "I"],
    D: ["B", "E", "F"],
    E: ["D"],
    F: ["D"],
    G: ["C"],
    H: ["C"],
    I: ["C", "J"],
    J: ["I"]
  };

  function bfs (startNode) {

    let needVisit = [startNode]; // 🌟🌟 Queue
    let visited = [];            

    while (needVisit.length !== 0) {
      const node = needVisit.shift();

      if (!visited.includes(node)) {
        visited.push(node);
        needVisit = [...needVisit, ...graph[node]];
      }
    }
    return visited;
  };
```

###### 결과
```Javascript
  console.log(bfs("A"));
  // ["A", "B", "C", "D", "G", "H", "I", "E", "F", "J"]
```





**DFS**


```Javascript
  const graph = {
    A: ["B", "C"],
    B: ["A", "D"],
    C: ["A", "G", "H", "I"],
    D: ["B", "E", "F"],
    E: ["D"],
    F: ["D"],
    G: ["C"],
    H: ["C"],
    I: ["C", "J"],
    J: ["I"],
  };

  function dfs(startNode) {
    let needVisit = [startNode]; // 🌟🌟 Stack
    let visited = [];

    while (needVisit.length !== 0) {
      const node = needVisit.pop();

      if (!visited.includes(node)) {
        visited.push(node);
        needVisit = [...needVisit, ...graph[node]];
      }
    }

    return visited;
  };
```


###### 결과
```Javascript
  console.log(bfs("A"));
  // ["A", "C", "I", "J", "H", "G", "B", "D", "F", "E"]
```



DFS와 BFS는 모두 노드 수+간선 수만큼의 복잡도를 지닌다. 즉, O(n)

시간복잡도의 차이는 없다.

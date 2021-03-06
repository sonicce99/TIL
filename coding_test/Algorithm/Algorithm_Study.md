# 알고리즘 내용 정리

![IMG](https://user-images.githubusercontent.com/87749134/144608717-85ec0e80-8448-4d55-87e5-53462b4796ce.jpg)


### 알고리즘 공부 방법 및 범위 예측


<img width="700" alt="스크린샷 2021-11-23 오후 8 30 56" src="https://user-images.githubusercontent.com/87749134/143670854-5fd93d7f-1880-45ec-b33e-38b2853d469c.png">


<img width="700" alt="스크린샷 2021-11-23 오후 8 39 42" src="https://user-images.githubusercontent.com/87749134/143670857-d1001722-5064-49b0-9d5e-30931efe369b.png">


<img width="700" alt="스크린샷 2021-11-23 오후 8 47 56" src="https://user-images.githubusercontent.com/87749134/143670860-73d12a60-df76-4a77-a651-ad66989c599b.png">


### 완전탐색(브루트포스 알고리즘) => 선형구조, 비선형 구조

*효율적으로 데이터를 담는 자료구조를 찾기위해 필요*


##### 자료구조의 분류

- 선형 구조: 배열, 스택, 큐 (순차탐색)  

> 데이터를 구성하는 원소들이 순차적으로 연결되어 있는 형태

<img width="600" alt="스크린샷 2021-11-25 오후 2 14 17" src="https://user-images.githubusercontent.com/87749134/143383624-51fa1772-6d00-4805-af23-25a75b368959.png">

- 비선형 구조: 트리, 그래프 (BFS,DFS)

> 하나의 데이터 뒤에 여러개의 데이터가 존재할 수 있는 형태  

<img width="600" alt="스크린샷 2021-11-25 오후 2 14 26" src="https://user-images.githubusercontent.com/87749134/143383628-1ba3243d-105d-4e2b-8aaa-78cea874e717.png">


***   

### 퀵정렬

- 퀵정렬은 우리가 선택한 기준원소에 따라 처리속도가 달라진다는 특징이 있음 .

- 평균적으로 nlogn의 시간복잡도를 가지지만, 최악의 경우에는 n^2의 시간복잡도를 가짐.  

> 예를 들어 정렬이 되어 있는 상태의 배열에서 퀵정렬을 하려고 하면 n^2



```javascript
  const array = [6,1,4,7,5,2,3]

  const quicksort = (array) => {
    if(array.length <2) return array

    const pivot = array[0];
    const left = [];
    const right = [];

    for(let i=1; i<array.length; i++) {
      if(array[i] <= pivot) left.push(array[i]);
      else right.push(array[i]);
    }

    const Lsorted = quicksort(left);
    const Rsorted = quicksort(right);

    return [...Lsorted, pivot, ...Rsorted]
  }


  console.log(quicksort(array))
```

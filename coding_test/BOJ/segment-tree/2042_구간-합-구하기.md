## 문제  (골드 1)      

- Link : https://www.acmicpc.net/problem/2042  


## 첫번째 풀이 (틀렸습니다.)    

```javascript
const solution = (array, goals) => {

  class SegmentTree {
    constructor() {
      this.tree = [];
    }

    getTree = () => {
      return this.tree;
    }

    makeTree = (array, node, startIndex, endIndex) => {
      if(startIndex === endIndex) {
        this.tree[node] = array[startIndex];
      }

      else {
        this.makeTree(array, node*2 + 1, startIndex, Math.floor((startIndex + endIndex) / 2));
        this.makeTree(array, node*2 + 2, Math.floor((startIndex + endIndex) / 2) + 1, endIndex);
        this.tree[node] = this.tree[node*2 + 1] + this.tree[node*2 + 2];
      }
    }

    sum = (node, startIndex, endIndex, left, right) => {
      if(left > endIndex || right < startIndex) {
        return 0
      }

      else if(startIndex >= left && right >= endIndex) {
        return this.tree[node];
      }

      else {
        const lsum = this.sum(node*2 + 1, startIndex, Math.floor((startIndex + endIndex) / 2) , left, right);
        const rsum = this.sum(node*2 + 2, Math.floor((startIndex + endIndex) / 2) + 1, endIndex , left, right);
        return lsum + rsum;
      }
    }

    update = (array, index, val) => {
      const diff = val - array[index];
      array[index] = val;
      this.update_tree(0, 0, array.length - 1, index, diff);
    }

    update_tree = (node, startIndex, endIndex, index, diff) => {
      if(startIndex > index || endIndex < index) {
        return
      }

      this.tree[node] += diff;

      if(startIndex !== endIndex) {
        this.update_tree(node*2 + 1, startIndex, Math.floor((startIndex + endIndex) / 2), index, diff)
        this.update_tree(node*2 + 2, Math.floor((startIndex + endIndex) / 2) + 1, endIndex, index, diff);
      }
    }
  }

  const answer = [];
  const segment = new SegmentTree();
  segment.makeTree(array, 0, 0, array.length - 1);

  goals.forEach(el => {
    const [a, b, c] = el.split(' ').map(Number);

    if(a === 1) {
      segment.update(array, b - 1, c);
    }

    else {
      const value = segment.sum(0, 0 , array.length - 1, b - 1, c - 1);
      answer.push(value);
    }
  })

  return answer.join('\n');
}

const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, K] = input.shift().split(' ').map(Number);

const array = input.slice(0, N).map(Number);

const goals = input.slice(N);

console.log(solution(array, goals));
```

틀린 이유: 문제에서 정답은 -2^63보다 크거나 같고, 2^63-1보다 작거나 같은 정수이다. 라는 조건이 있었다. 즉 BigInt를 사용해야 했다.


## 두번째 풀이 (1244ms)

```javascript
const solution = (array, goals) => {

  class SegmentTree {
    constructor() {
      this.tree = [];
    }

    getTree = () => {
      return this.tree;
    }

    makeTree = (array, node, startIndex, endIndex) => {
      if(startIndex === endIndex) {
        this.tree[node] = array[startIndex];
      }

      else {
        this.makeTree(array, node*2 + 1, startIndex, Math.floor((startIndex + endIndex) / 2));
        this.makeTree(array, node*2 + 2, Math.floor((startIndex + endIndex) / 2) + 1, endIndex);
        this.tree[node] = this.tree[node*2 + 1] + this.tree[node*2 + 2];
      }
    }

    sum = (node, startIndex, endIndex, left, right) => {
      if(left > endIndex || right < startIndex) {
        return 0
      }

      else if(startIndex >= left && right >= endIndex) {
        return this.tree[node];
      }

      else {
        const lsum = this.sum(node*2 + 1, startIndex, Math.floor((startIndex + endIndex) / 2) , left, right);
        const rsum = this.sum(node*2 + 2, Math.floor((startIndex + endIndex) / 2) + 1, endIndex , left, right);
        return BigInt(lsum) + BigInt(rsum);
      }
    }

    update = (array, index, val) => {
      const diff = BigInt(val) - array[index];
      array[index] = BigInt(val);
      this.update_tree(0, 0, array.length - 1, index, diff);
    }

    update_tree = (node, startIndex, endIndex, index, diff) => {
      if(startIndex > index || endIndex < index) {
        return
      }

      this.tree[node] += diff;

      if(startIndex !== endIndex) {
        this.update_tree(node*2 + 1, startIndex, Math.floor((startIndex + endIndex) / 2), index, diff)
        this.update_tree(node*2 + 2, Math.floor((startIndex + endIndex) / 2) + 1, endIndex, index, diff);
      }
    }
  }

  const answer = [];
  const segment = new SegmentTree();
  segment.makeTree(array, 0, 0, array.length - 1);

  goals.forEach(el => {
    const [a, b, c] = el.split(' ').map(Number);

    if(a === 1) {
      segment.update(array, b - 1, c);
    }

    else {
      const value = segment.sum(0, 0 , array.length - 1, b - 1, c - 1);
      answer.push(value);
    }
  })

  return answer.join('\n');
}

const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, K] = input.shift().split(' ').map(Number);

const array = input.slice(0, N).map(el => BigInt(el));

const goals = input.slice(N);

console.log(solution(array, goals));
```

현재 티어가 골드 5인데 무려 골드 1의 문제를 풀었다... 😆😆😆

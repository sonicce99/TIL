- 링크 : https://book.acmicpc.net/ds/segment-tree  

## tree 만들기

```javascript
const tree = [];

const init = (array, tree, node, startIndex, endIndex) => {
  if(startIndex === endIndex) {
    tree[node] = array[startIndex];
  }

  else {
    init(array, tree, node*2, startIndex, Math.floor((startIndex + endIndex) / 2));
    init(array, tree, node*2+1, Math.floor((startIndex + endIndex) / 2) + 1, endIndex);
    tree[node] = tree[node*2] + tree[node*2 + 1];
  }
}
```


## 구간 합 구하기

```javascript
const sum = (tree, node, startIndex, endIndex, left, right) => {

  if(left > endIndex || right < startIndex) {
    return 0
  }

  else if(startIndex >= left && right >= endIndex) {
    return tree[node];
  }

  else {
    const lsum = sum(tree, node*2, startIndex, Math.floor((startIndex + endIndex) / 2) , left, right);
    const rsum = sum(tree, node*2+ 1, Math.floor((startIndex + endIndex) / 2) + 1, endIndex , left, right);
    return lsum + rsum;
  }
}
```

## 수 변경하기

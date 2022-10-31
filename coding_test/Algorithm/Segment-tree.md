- 링크 : https://book.acmicpc.net/ds/segment-tree

```javascript
class SegmentTree {
  constructor() {
    this.tree = [];
  }

  getTree = () => {
    return this.tree;
  };

  makeTree = (array, node, startIndex, endIndex) => {
    if (startIndex === endIndex) {
      this.tree[node] = array[startIndex];
    } else {
      this.makeTree(
        array,
        node * 2 + 1,
        startIndex,
        Math.floor((startIndex + endIndex) / 2)
      );
      this.makeTree(
        array,
        node * 2 + 2,
        Math.floor((startIndex + endIndex) / 2) + 1,
        endIndex
      );
      this.tree[node] = this.tree[node * 2 + 1] + this.tree[node * 2 + 2];
    }
  };

  sum = (node, startIndex, endIndex, left, right) => {
    if (left > endIndex || right < startIndex) {
      return 0;
    } else if (startIndex >= left && right >= endIndex) {
      return this.tree[node];
    } else {
      const lsum = this.sum(
        node * 2 + 1,
        startIndex,
        Math.floor((startIndex + endIndex) / 2),
        left,
        right
      );
      const rsum = this.sum(
        node * 2 + 2,
        Math.floor((startIndex + endIndex) / 2) + 1,
        endIndex,
        left,
        right
      );
      return lsum + rsum;
    }
  };

  update = (array, index, val) => {
    const diff = val - array[index];
    array[index] = val;
    this.update_tree(0, 0, array.length - 1, index, diff);
  };

  update_tree = (node, startIndex, endIndex, index, diff) => {
    if (startIndex > index || endIndex < index) {
      return;
    }

    this.tree[node] += diff;

    if (startIndex !== endIndex) {
      this.update_tree(
        node * 2 + 1,
        startIndex,
        Math.floor((startIndex + endIndex) / 2),
        index,
        diff
      );
      this.update_tree(
        node * 2 + 2,
        Math.floor((startIndex + endIndex) / 2) + 1,
        endIndex,
        index,
        diff
      );
    }
  };
}
```

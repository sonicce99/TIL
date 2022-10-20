# Min Heap (최소힙)

```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }

  getLength = () => {
    return this.heap.length;
  };

  swap = (a, b) => {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  };

  push = (value) => {
    this.heap.push(value);
    let childIndex = this.heap.length - 1;
    let parentIndex = Math.floor((childIndex - 1) / 2);

    while(this.heap[parentIndex] > this.heap[childIndex]) {
      this.swap(parentIndex, childIndex);
      childIndex = parentIndex;
      parentIndex = Math.floor((childIndex - 1) / 2);
    }
  }

  pop = () => {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const result = this.heap[0];
    this.heap[0] = this.heap.pop();

    let parentIndex = 0;
    while (true) {
      const leftI = parentIndex * 2 + 1;
      const rightI = parentIndex * 2 + 2;

      if(this.heap[parentIndex] > this.heap[leftI] || this.heap[parentIndex] > this.heap[rightI]) {

        if(this.heap[leftI] > this.heap[rightI]) {
          this.swap(parentIndex, rightI);
          parentIndex = rightI;          
        }

        else {
          this.swap(parentIndex, leftI);
          parentIndex = leftI;
        }
      }

      else {
        break;
      }
    }
    return result;
  };
}
```

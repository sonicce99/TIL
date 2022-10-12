- 링크 : https://opentutorials.org/module/1335/8821


```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push_front(value) {
    const newNode = new Node(value);

    if(this.size()==0) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  push_back(value) {
    const newNode = new Node(value);

    if(this.size()==0) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
  }

  pop_front() {
    if(this.size() == 0) {
      return -1;
    }
    else {
      const value = this.head.value;
      this.head = this.head.next;
      if(this.size() == 1) {
          this.head = null;
      }
      else {
          this.head.prev = null;
      }
      this.length--;
      return value;
    }
  }

  pop_back() {
    if(this.size() == 0) {
      return -1;
    }
    else {
      const value = this.tail.value;
      this.tail = this.tail.prev;
      if(this.size() ==1){
        this.tail = null;
      }else{
        this.tail.next = null;
      }
      this.length--;
      return value;
    }
  }

  size() {
    return this.length;
  }

  empty() {
    if(this.length == 0) {
      return 1;
    }

    return 0;
  }

  front() {
    if(this.size() == 0) {
      return -1;
    }

    return this.head.value;
  }

  back() {
    if(this.size() == 0) {
      return -1;
    }

    return this.tail.value;
  }
}
```

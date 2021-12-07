# Map, Set 객체 내용 정리


## Map 객체  

```javascript

let my = new Map();

my.set('치킨',1); // 치킨: 1
my.size;       // 1
my.get('피자');
my.has('햄버거');
my.delete('치킨');

console.log(my);
console.log(my.has('햄버거')) // false
console.log(my.get('치킨')) // 1

for(let [key,value] of my) {
  console.log(key, value)
}
```  


### Object 와 Map 비교

- Object의 키는 Strings이며, Map의 키는 모든 값을 가질 수 있다.

- Object는 크기를 수동으로 추적해야하지만, Map은 크기를 쉽게 얻을 수 있다. (size)

- Map은 삽입된 순서대로 반복된다.



***



## Set 객체

```javascript
let my = new Set();

my.add('치킨');
my.has('피자');
my.delete("치킨");  
my.size;

for (let item of mySet) {
  console.log(item);
}
```

### Array 와 Set 비교

- 배열에서 indexOf 메서드를 활용해서 특정 요소가 존재하는지 확인하는 것은 느리다. (has)

- 배열에선 해당 요소를 배열에서 잘라내야 하는 반면 Set객체는 요소의 값으로 해당 요소를 삭제하는 기능 제공한다.

*반복되지 않는 값의 특정 요소가 있는지 찾고 삭제하는데 특화되어 있는 장점이 있음*

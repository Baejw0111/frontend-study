# JS 빌트인 함수

## map

map은 호출된 배열의 모든 요소에서 제공된 함수를 호출한 결과로 채워진 새 배열을 만든다.

```js
const initialNumbers = [1, 2, 3, 4, 5];
const addTwo = (n) => n + 2;

const newNumbers = initialNumbers.map(addTwo);

console.log(initialNumbers); // [1, 2, 3, 4, 5]
console.log(newNumbers); // [3, 4, 5, 6, 7]
```

## filter

filter는 내부에 콜백 함수 테스트를 통과하는 요소만 필터링해 지정된 배열의 **얕은 복사본**을 생성한다.

```js
const words = [
  "프로그래밍 패러다임",
  "함수형 프로그래밍",
  "순수 함수",
  "사이드 이펙트",
  "함수 조합",
];

const isWordGreaterThanSeven = (word) => word.length > 7;

const result = words.filter(isWordGreaterThanSeven); // ['프로그래밍 패러다임', '함수형 프로그래밍']
```

## reduce

reduce는 호출된 배열은 변경하지 않는다.
배열의 모든 요소에 대해 콜백 함수를 실행해 새로운 배열을 만든다.

```js
const initialList = [1, 2, 3, 4, 5];

const multiplyList = initialList.reduce(
  (accumulator, currentValue) => accumulator * currentValue
);

console.log(initialList); // [1, 2, 3, 4, 5]
console.log(multiplyList); // 120
```

## flat

flat은 이름대로 2차 이상의 고차 배열을 1차 배열로 만든다.

```js
const list1 = [1, 2, 3, 4, [5, 6]];

console.log(list1.flat()); // [1, 2, 3, 4, 5, 6]

const list2 = [1, 2, 3, 4, [[5, 6]]];

console.log(list2.flat(Infinity)); // [1, 2, 3, 4, 5, 6]
```

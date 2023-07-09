# ECMAScript 기초

문서 내의 예시 코드는 **Typescript**를 사용하며, https://github.com/yamoo9/ssafy-react-2023/의 코드를 기반으로 하고 있다.

## Typescript 개발 환경 구성

### 프로그램 설치

TS(Typescript)는 JS(Javascript)와 달리 표준이 아니기 때문에 브라우저가 직접 해석을 못한다.
따라서 JS로 컴파일하기 위한 개발환경 구성이 필요하다.

이를 위해서는 node.js 설치 후 pnpm 설치를 해야 한다.
다음 명령어로 pnpm 설치가 가능하다.

```
npm install -g pnpm
```

### 패키지 설정

pnpm에서는 `pnpm add -D "패키지 이름"` 으로 패키지를 설치할 수 있다.

`package.json` 파일로 패키지 설정을 할 수 있는데, `scripts` 속성에 명령어를 등록하여 pnpm으로 실행할 수 있다.

실습에서 사용하는 `package.json` 파일의 내용은 다음과 같다.

```json
{
  "type": "module",
  "scripts": {
    "dev": "pnpm watch | pnpm serve",
    "serve": "live-server --host=localhost --port=3000 --no-browser",
    "compile": "tsc -p tsconfig.json",
    "watch": "pnpm compile --watch"
  },
  "devDependencies": {
    "live-server": "1.2.2",
    "ts-node": "10.9.1", // 타입 스크립트 파일을 개별적으로 실행할 수 있다.
    "typescript": "5.1.6"
  }
}
```

위 내용을 복사해 `pnpm init` 명령어로 패키지 설정을 끝낼 수 있다.

설정된 명령어의 기능은 다음과 같다.

|  명령어   |                                      기능                                       |
| :-------: | :-----------------------------------------------------------------------------: |
|   `dev`   |        `serve` 명령어 실행 중에 ts 파일에 변경 사항 발생 시 실시간 적용         |
|  `serve`  |                                    서버 구동                                    |
| `compile` | ts 파일을 js 파일로 컴파일<br>(`tsconfig.json`은 `pnpm tsc init`으로 생성 가능) |
|  `watch`  |             ts 파일에 변경사항 발생할 때마다 `compile 명령어 실행`              |

typescript 개별 실행 시 **deno**를 사용하면 빠르게 실행시킬 수 있기 때문에 좋은 선택지일 수 있다.

## let, const

let과 const는 block scope를 가진다.

## Template literal

표현식이 포함된 문자열을 만들 수 있는 기능이다.

```ts
function printTableHTML(data: {
  caption: string;
  rows: {
    headline: string;
    content: string;
  }[];
}): string {
  return `
      <table class="table">
        <caption class="sr-only">${data.caption}</caption>
        ${data.rows
          .map(
            (item) =>
              `
              <tr>
                <th>${item.headline}</th>
                <td>${item.content}</td>
              </tr>
            `
          )
          .join("")}
      </table>
    `;
}
```

## Null 병합 연산자

**Null 병합 연산자** `??`를 사용하면 한쪽 변수가 **nullish**인지 판단할 수 있다.
여기서 **Nullish**는 null 또는 undefined인 상태를 의미한다.

다음과 같이 사용할 수 있다.

```ts
let x = a ?? b;
// a가 nullish가 아니면 x에 a의 값이 저장됨
// 아니면 b의 값이 저장됨
```

## Nullish optional chaining

nullish일 수 있는 속성에 안전하게 접근하도록 하여 오류를 방지할 수 있는 기능이다.
리액트에서 많이 사용되는 기능이므로 눈여겨 보는 것이 좋다.

```ts
// 사용자 정의 타입
type Topic = {
  _title: string;
  getTitle(): string;
  setTitle(value: string): void;
  getName?: () => string; // function | undefined
};

function optionalChaining() {
  const topic: Topic = {
    _title: "매년 업데이트 되는 ECMAScript",
    getTitle() {
      return this._title;
    },
    setTitle(value) {
      this._title = value;
    },
  };

  if (topic && typeof topic === "object" && !Array.isArray(topic)) {
    let title, name;
    if (typeof topic.getTitle === "function") {
      title = topic.getTitle();
    }
    console.log("typeof : ", title);
    console.log("typeof : ", name);

    // if (typeof topic.getName === 'function') {
    // name = topic.getName();
    // }
    name = topic.getName?.(); // Nullish optional chaining
  }

  let title, name;
}
```

## Spread syntax(전개 구문)

전개 연산자(`...`)을 쓰는 문법으로, 배열이라는 자료 구조로 묶여있는 배열 내의 요소들을 개별적으로 전개시킨다.

```ts
// 보통 위에서 나온 type보다 interface가 주로 쓰인다.
interface Options {
  startIndex?: number;
  loop?: boolean;
  usingAria?: boolean;
}

function combineObject() {
  const defaultOptions: Options = {
    startIndex: 0,
    loop: false,
    usingAria: true,
  };

  const customOptions: Options = {
    loop: true,
    // startIndex: 0,
    // usingAria: true,
  };

  let combineOptions = Object.assign({}, defaultOptions, customOptions);
  console.log(combineOptions);
  combineOptions = { ...defaultOptions, ...customOptions };
  console.log(combineOptions);
}
```

## Destructuring assignment(구조 분해 할당)

배열이나 객체의 구조 분해해 스코프 안에서 사용할 변수(또는 상수)에 할당하는 것을 말한다.
쉽게 말해 객체의 요소들을 추출하는 기능이다.

```ts
interface Course {
  id: number;
  title: string;
  url: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "React 펀더멘탈",
    url: "https://fundamentals.dev/react",
  },
  {
    id: 2,
    title: "React Router 펀더멘탈",
    url: "https://fundamentals.dev/react-rouer",
  },
  {
    id: 3,
    title: "Recoil 펀더멘탈",
    url: "https://fundamentals.dev/recoil",
  },
];

function spreadObject() {
  const [reactCourse] = courses; // 첫번째 객체
  const [reactCourse] = courses; //두번째 객체
  const [reactCourse] = courses; // 세번째 객체

  // 객체 구조 분해 할당
  // 객체 구조 분해해서 지역 변수로 할당
  // 변수 이름 알리아스(별칭: alias)
  const {
    url: reactCourseUrl,
    id: reactCourseId,
    title: reactCourseTitle,
  } = reactCourse;

  console.log(reactCourseId); // 1
  console.log(reactCourseTitle); //React 펀더멘탈
  console.log(reactCourseUrl); //https://fundamentals.dev/react
}
```

## Arrow function

아는 거라 패스

## Default parameters

그냥 기본 매개변수 설정하는거다.

```ts
const randomNumber = (min: number = 0, max: number = 10): number => {
  return Math.round(Math.random() * (max - min)) + min;
};
```

## Rest parameters

매개변수을 일일히 설정하기 힘들고 어짜피 다 똑같이 설정할 예정이라면 다음과 같이 전개 연산자를 사용해 나머지 매개변수들에 대해 설정할 수 있다.

```ts
const sum = (firstNumber: number, ...restNumbers: number[]): number => {
  console.log(Array.isArray(restNumbers));

  return restNumbers.reduce((result, number) => result + number, firstNumber);
};
```

## Iterable iterator

## Generator functions

## Promise async await

## Es modules

## Class

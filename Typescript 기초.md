# Typescript 기초

문서 내의 예시 코드는 https://github.com/yamoo9/ssafy-react-2023/의 코드를 기반으로 하고 있다.

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

## let, const

JS와 동일하게 TS에서도 let과 const는 block scope를 가진다.

## Template literal

이것 또한 JS와 동일하게 **Template literal**이 지원된다.
여기서 Template literal이란 다음 예시처럼 표현식이 포함된 문자열을 만들 수 있는 기능이다.

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

**Nullish optional chaining**은 nullish일 수 있는 속성에 안전하게 접근하도록 하여 오류를 방지할 수 있는 기능이다.
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

## Spread syntax

## Destructuring assignment

## Arrow function

## Default parameters

## Rest parameters

## Iterable iterator

## Generator functions

## Promise async await

## Es modules

## Class

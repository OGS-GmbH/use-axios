---
prev: false
next: false
---

# Getting started

## Installation

### Prerequisites

- Node.js version 18 or higher.
- A package manager: e.g. npm, pnpm, ...

::: code-group

```sh [npm]
$ npm add @ogs-gmbh/use-axios
```

```sh [pnpm]
$ pnpm add @ogs-gmbh/use-axios
```

```sh [yarn]
$ yarn add @ogs-gmbh/use-axios
```

```sh [bun]
$ bun add @ogs-gmbh/use-axios
```

:::

### Usage

Here we provide a simple example. Get a deeper understanding in our [`reference`](/reference).

```tsx [example.ts]
import { useAxios } from "@ogs-gmbh/use-axios";

function MyComponent () {
  const { hasError, data } = useAxios({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/todos/1"
  })

  return (
    <>
      {
        hasError
          ? "Request failed. Try again."
          : <p>{data.title}</p>
      }
    </>
  )
}
```

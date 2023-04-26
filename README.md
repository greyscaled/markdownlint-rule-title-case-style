# `markdownlint-rule-title-case-style`

Enforces case style in titles.

This is an early release and presently only enforces sentence case in titles.
More configuration options will be added in the future, including other cases
and handling Front Matter.

## Usage

### Install

```console
yarn add -D markdownlint-rule-title-case-style
```

### Add the rule

#### `markdownlint-cli`

```console
markdownlint --rules="markdownlint-rule-title-case-style"
```

#### Node

```ts
import titleCaseStyle from "markdownlint-rule-title-case-style"

markdownlint({ customRules: [titleCaseStyle] })
```

### Options

Presently, there are no options.

# `markdownlint-rule-title-case-style`

Enforces case style in titles.

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

### Configuration

For more information, refer to the [rule documentation].

```json
{
  "title-case-style": {
    "case": "<case-style>"
  }
}
```

Where `<case-style>` is one of:

- "sentence" (default)
- "title"

[rule documentation]:
  https://github.com/greyscaled/markdownlint-rule-title-case-style/blob/main/docs/rules/title-case-style.md

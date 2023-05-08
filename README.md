# `markdownlint-rule-title-case-style`

Enforces case style in titles. Presently, the rule can:

- enforce title or sentence case
- ignore specified words
- ignore leading lists (example: `### 1. Some heading`)
- ignore ending punctuation and commas

This tool is in an early stage. Bug reports and feature requests
are encouraged. For more information see [CONTRIBUTING].

## Usage

### Install

```console
yarn add -D markdownlint-rule-title-case-style
```

### Add the rule

#### `markdownlint-cli2` (recommended)

Add one of the supported configuration formats, example
`.markdownlint-cli2.jsonc`:

```jsonc
{
  "config": {
    "title-case-style": {
      "ignore": ["SQL"]
    }
  },
  "customRules": ["markdownlint-rule-title-case-style"]
}
```

#### `markdownlint-cli`

```console
markdownlint --rules="markdownlint-rule-title-case-style"
```

#### Node

```ts
import titleCaseStyle from "markdownlint-rule-title-case-style"

markdownlint.sync({
  customRules: [titleCaseStyle],
  config: {
    "title-case-style": {
      "ignore": ["SQL"]
    },
  },
})
```

### Configuration

For more information, refer to the [rule documentation].

```json
{
  "title-case-style": {
    "case": "sentence",
    "ignore": ["SQL"]
  }
}
```

### Fix

This rule can automatically fix violations

```console
markdownlint-cli2-fix 
```

### Ignoring cases

If there's a bug/incorrect report, or a case that shouldn't be enforced, simply
wrap the lines as follows:

```text
<!-- markdownlint-disable title-case-style -->

# Your Heading

<!-- markdownlint-enable title-case-style -->
```

[CONTRIBUTING]:
  https://github.com/greyscaled/markdownlint-rule-title-case-style/blob/main/.github/CONTRIBUTING.md
[rule documentation]:
  https://github.com/greyscaled/markdownlint-rule-title-case-style/blob/main/docs/rules/title-case-style.md

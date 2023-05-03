# `markdownlint-rule-title-case-style`

Enforces case style in titles. Presently, the rule can:

- enforce title or sentence case
- ignore a list of words (example words that should be capitalized)
- ignore leading lists (example: `### 1. Some heading`)
- ignore ending punctuation and commas

This tool is in an early stage and any other desired cases are welcomed as
issues or pull requests.

## Usage

### Install

```console
yarn add -D markdownlint-rule-title-case-style
```

### Add the rule

#### `markdownlint-cli2` (recommended)

Add one of the supported configuration formats, example
`.markdownlint-cli2.jsconc`:

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

markdownlint({ customRules: [titleCaseStyle] })
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

### Ignoring cases

If there's a bug/incorrect report, or a case that shouldn't be enforced, simply
wrap the lines as follows:

```text
<!-- markdownlint-disable title-case-style -->

# Your Heading

<!-- markdownlint-enable title-case-style -->
```

[rule documentation]:
  https://github.com/greyscaled/markdownlint-rule-title-case-style/blob/main/docs/rules/title-case-style.md

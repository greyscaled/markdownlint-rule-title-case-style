# `markdownlint-rule-title-case-style`

This custom rule enforces consistent case styles in markdown titles. Supported
options are:

- case: `"sentence"` or `"title"` (default: sentence)
- ignore: a list of strings to ignore

## Install

```shell
yarn add -D markdownlint-rule-title-case-style
```

```shell
npm --save-dev markdownlint-rule-title-case-style
```

This package is a peer/plugin to the `markdownlint` ecosystem and most cases
will require installing [`markdownlint` or related packages], depending on your
use case.

## Usage

### Add the rule

#### `markdownlint-cli2` (recommended)

Add one of the [supported configuration formats], for example
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

> It is recommended to use `markdownlint-cli2`, as it is written and actively
> maintained by the maintainer of `markdownlint`.

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
      ignore: ["SQL"],
    },
  },
})
```

### Configuration

```jsonc
{
  "title-case-style": {
    "case": "<case-style>",
    "ignore": ["<ignore-list>"]
  }
}
```

Where `<case-style>` is one of:

- "sentence" (default)
- "title"

and `<ignore-list>` is an array of strings to ignore.

### Fix

This rule can automatically fix violations. For example with
`markdownlint-cli-2`:

```console
markdownlint-cli2-fix
```

### Ignoring errors

If there's a bug/incorrect report, or a case that shouldn't be enforced, simply
wrap the lines as follows:

```text
<!-- markdownlint-disable title-case-style -->

# Your Heading

<!-- markdownlint-enable title-case-style -->
```

## Issues and contributing

This tool is in an early stage. Bug reports and feature requests are encouraged.
For more information see [CONTRIBUTING].

[`markdownlint` or related packages]:
  https://github.com/DavidAnson/markdownlint#related
[supported configuration formats]:
  https://github.com/DavidAnson/markdownlint-cli2#configuration
[CONTRIBUTING]:
  https://github.com/greyscaled/markdownlint-rule-title-case-style/blob/main/.github/CONTRIBUTING.md

# `markdownlint-rule-title-case-style`

This rule ensures that Markdown headings use a consistent [Letter case] style.
Currently supported cases are:

- sentence (default)
- title (via [`title-case`](https://www.npmjs.com/package/title-case))

## Scope

This plugin attempts to minimize its scope and defer to existing rules. See all
[existing rules], and in particular:

- [no-trailing-spaces]

  `title-case-style` assumes headings do not have trailing spaces.

- [no-trailing-punctuation]

  `title-case-style` can handle ending punctuation. If there is more than one
  sentence, each is processed. For example, the following is valid sentence
  case:

  ```md
  # Sentence one. Sentence two
  ```

- [no-inline-html]

  > **important**: This rule does not properly parse inline html in headings

  By default, `no-inline-html` has no allowed elements. This rule currently
  assumes the default.

- [proper-names]

  `proper-names` is _extremely_ handy, as it can find mistakes like "Javascript"
  anywhere in the document, and correct it to "JavaScript". Unfortunately,
  `title-case-style` doesn't have access to the configuration for
  `proper-names`. You may need to copy a subset of them to `ignore`.

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

> It is recommended to use `markdownlint-cli2`, as it is written and actively
> maintained by the maintainer of `markdownlint`.

#### `markdownlint-cli2``

Add one of the [supported configuration formats], for example
`.markdownlint-cli2.jsonc`:

```jsonc
{
  "config": {
    "title-case-style": {
      "case": "sentence", // or "title"
      "ignore": ["JavaScript"]
    }
  },
  "customRules": ["markdownlint-rule-title-case-style"]
}
```

#### Node

```ts
import titleCaseStyle from "markdownlint-rule-title-case-style"

markdownlint.sync({
  customRules: [titleCaseStyle],
  config: {
    "title-case-style": {
      case: "sentence", // or "title"
      ignore: ["JavaScript"],
    },
  },
})
```

### Fix

This rule can automatically fix violations. For example with
`markdownlint-cli-2`:

```shell
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

[Letter case]: https://en.wikipedia.org/wiki/Letter_case
[existing rules]: https://github.com/DavidAnson/markdownlint#rules--aliases
[no-trailing-spaces]:
  https://github.com/DavidAnson/markdownlint/blob/main/doc/md009.md
[no-trailing-punctuation]:
  https://github.com/DavidAnson/markdownlint/blob/main/doc/md026.md
[no-inline-html]:
  https://github.com/DavidAnson/markdownlint/blob/main/doc/md033.md
[proper-names]:
  https://github.com/DavidAnson/markdownlint/blob/main/doc/md044.md
[`markdownlint` or related packages]:
  https://github.com/DavidAnson/markdownlint#related
[supported configuration formats]:
  https://github.com/DavidAnson/markdownlint-cli2#configuration
[CONTRIBUTING]:
  https://github.com/greyscaled/markdownlint-rule-title-case-style/blob/main/.github/CONTRIBUTING.md

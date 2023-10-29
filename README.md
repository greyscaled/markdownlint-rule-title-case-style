# `markdownlint-rule-title-case-style`

`markdownlint` custom rule for consistent [Letter case] style in headings.
Supported cases:

- sentence (default)
- title (using [`title-case`](https://www.npmjs.com/package/title-case))

## Scope

This rule is limited in scope to just letter casing. There are many [existing
rules] in the native `markdownlint` ecosystem that lint headings. Particular
rules of interest:

- [no-trailing-spaces]

- [no-trailing-punctuation]

  > **info** `title-case-style` can handle headings that have more than one
  > sentence or end punctuation.

- [no-inline-html]

  > **important**: This rule does not properly parse inline html By default,
  > `no-inline-html` has no allowed elements

- [proper-names]

  `proper-names` is great for applying mistakes to proper nouns like
  `"JavaScript"`. `title-case-style` **does not** have access to the
  configuration for `proper-names`. You can copy them to `title-case-style`'s
  `ignore` config.

## Install

```shell
yarn add -D markdownlint-rule-title-case-style
```

This package is a custom rule for the `markdownlint` ecosystem and most cases
will require installing [`markdownlint` or related packages].

## Usage

### `markdownlint-cli2`

This plugin seems to work best with `.markdownlint-cli2.cjs` or
`.markdownlint-cli2.mjs` extensions:

```mjs
// .markdownlint-cli2.mjs
import titleCaseStyle from "markdownlint-rule-title-case-style"

export default {
  customRules: [titleCaseStyle],
  config: {
    "title-case-style": {
      // letter case style to apply
      //
      // "sentence" or "title" (default: sentence)
      case: "sentence",
      // words to ignore when applying letter case.
      //
      // string[] (default: [])
      ignore: ["JavaScript"],
    },

    // ... other markdownlint configurations
  },
}
```

To automatically fix errors run `markdownlint-cli2 --fix`.

### Ignoring errors

If there's a bug, or a case that shouldn't be enforced, simply wrap the lines as
follows:

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
[CONTRIBUTING]:
  https://github.com/greyscaled/markdownlint-rule-title-case-style/blob/main/.github/CONTRIBUTING.md

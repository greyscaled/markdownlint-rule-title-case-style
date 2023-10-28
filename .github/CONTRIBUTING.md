# Contributing

This project is small in scope, and aims to be simple, with sensible standards.

## Issues

- For fixes and small changes, feel free to open a PR (no issue)
- For larger and/or opinionated changes, consider opening an issue first

## PR guidelines

- PR titles adhere [conventional commits]

## Development

The main rule (entrypoint) is in `rule.ts`.

### How it works

See [CommonMark Spec] and [`markdown-it`] for more information on the
specification and token structure.

A high-level view of the algorithm:

- `rule.ts`: the rule receives a slice of markdown-it tokens

- `filter_headings.ts`: tokens are filtered for heading [leaf block]

  - the content of headings are always [inline]

- `lint_inline.ts`: each [inline] heading is validated, and linted for
  violations. To lint:

  - the [inline] heading child nodes are walked for [text nodes]

    - [code spans] are ignored
    - [links] and [autolinks] are ignored
    - [images] are ignored
    - text inside [emphasis and strong emphasis] is processed as if the emphasis
      does not exist

  - once a text node is reached, it's content is transformed by the case that
    has been configured (sentence, or title)

    - if sentence, `tokenizer.ts`: [text nodes] are tokenized to make case
      transformation logic easier to apply.

- `lint_inline.ts` is able to report violations for each text node that doesn't
  have correct casing

### Environment

Standard Node.js environment, though we do use modern Yarn

- Node.js LTS
- Yarn stable

See `package.json` for available `scripts` regarding linting, formatting etc.

### Tests

Everything should have tests, since the project is small but many things can go
wrong with string manipulation etc.

[conventional commits]: https://www.conventionalcommits.org/en/v1.0.0/
[CommonMark Spec]: https://spec.commonmark.org/current/
[`markdown-it`]: https://markdown-it.github.io/
[leaf block]: https://spec.commonmark.org/current/#leaf-blocks
[inline]: https://spec.commonmark.org/current/#inlines
[text nodes]: https://spec.commonmark.org/current/#textual-content
[code spans]: https://spec.commonmark.org/current/#code-spans
[links]: https://spec.commonmark.org/current/#links
[autolinks]: https://spec.commonmark.org/current/#autolinks
[images]: https://spec.commonmark.org/current/#images
[emphasis and strong emphasis]:
  https://spec.commonmark.org/current/#emphasis-and-strong-emphasis

# Contributing

1. Make sure an issue exists first. If an issue doesn't exist, create one.
2. The title of your PR should adhere to [conventional commits].
3. Be patient with the maintainer.

## Development environment

- Node.js LTS
- Yarn

See `package.json` for available `scripts` regarding linting, formatting etc.

## Developing

- The main rule and tests are in `rule.ts` and `rule.test.ts`
  - Everything you need to know can be inferred from those files
- Everything should have tests, since the project is small but many things can
  go wrong with string manipulation etc.

[conventional commits]: https://www.conventionalcommits.org/en/v1.0.0/

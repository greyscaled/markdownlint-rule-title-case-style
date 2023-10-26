# Contributing

This project is small in scope, and aims to be simple. That said, we do try
to maintain some standards around code and commits, as most projects do.

## General guidelines

- Be patient with the maintainer and respectful of others

## Issue guidelines

- Always check the issue tracker first

- For fixes and small changes, feel free to open a PR (no issue)
  
- For larger and/or opinionated changes, consider opening an issue first

## PR guidelines

- The title of your PR should adhere to [conventional commits]
  - We squash, and only care that the title reflects the change

## Development

The main rule and tests are in `rule.ts` and `rule.test.ts`. Everything you
need to know can be inferred from those files.

### Environment

Standard Node.js environment, though we do use modern Yarn

- Node.js LTS
- Yarn stable

See `package.json` for available `scripts` regarding linting, formatting etc.

### Tests

Everything should have tests, since the project is small but many things can go
wrong with string manipulation etc.

[conventional commits]: https://www.conventionalcommits.org/en/v1.0.0/

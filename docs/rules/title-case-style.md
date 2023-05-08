<!-- markdownlint-disable title-case-style -->

# title-case-style

<!-- markdownlint-enable title-case-style -->

## Rule details

Enforce a consistent case style for markdown titles.

## Configuration

```json
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

## Examples

### Incorrect 👎

For `"case": "sentence"`

```md
# Hello World
```

For `"case": "title"`

```md
# Goodbye world
```

### Correct 👍

For `"case": "sentence"`

```md
# Hello world
```

For `"case": "title"`

```md
# Goodbye World
```

For `"case": "sentence"` and `"ignore": ["SQL]`

```md
# Check out these SQL commands
```

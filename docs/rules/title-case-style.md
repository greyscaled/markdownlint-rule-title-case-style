# title-case-style

## Rule details

Enforce a consisten case style for titles.

## Configuration

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

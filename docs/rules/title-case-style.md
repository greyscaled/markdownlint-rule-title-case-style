# `title-case-style`

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

- Sentence case

  ```json
  {
    "case": "sentence"
  }
  ```

  ```md
  # Hello World
  ```

- Title case

  ```json
  {
    "case": "title"
  }
  ```

  ```md
  # Goodbye world
  ```

### Correct 👍

- Sentence case

  ```json
  {
    "case": "sentence"
  }
  ```

  ```md
  # Hello world
  ```

- Title case

  ```json
  {
    "case": "title"
  }
  ```

  ```md
  # Goodbye World
  ```

- Ignoring words

  ```json
  {
    "case": "sentence",
    "ignore": ["SQL"]
  }
  ```

  ```md
  # Check out these SQL commands
  ```

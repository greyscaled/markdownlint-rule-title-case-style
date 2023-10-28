import { expect, test } from "@jest/globals"

import tokenizer, { Token } from "./tokenizer.js"

// prettier-ignore
const kitchenSink =
`word (smith) one-of-a-kind. Truly  AWESOME!!
`

test("tokenizer", () => {
    expect(tokenizer(kitchenSink)).toEqual([
        {
            group: "chars",
            value: "word",
        },
        {
            group: "whitespace",
            value: " ",
        },
        {
            group: "paren",
            value: "(",
        },
        {
            group: "chars",
            value: "smith",
        },
        {
            group: "paren",
            value: ")",
        },
        {
            group: "whitespace",
            value: " ",
        },
        {
            group: "chars",
            value: "one-of-a-kind",
        },
        {
            group: "terminal",
            value: ".",
        },
        {
            group: "whitespace",
            value: " ",
        },
        {
            group: "chars",
            value: "Truly",
        },
        {
            group: "whitespace",
            value: " ",
        },
        {
            group: "whitespace",
            value: " ",
        },
        {
            group: "uppercase",
            value: "AWESOME",
        },
        {
            group: "terminal",
            value: "!",
        },
        {
            group: "terminal",
            value: "!",
        },
    ] as Token[])
})

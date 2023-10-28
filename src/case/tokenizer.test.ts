import { describe, expect, test } from "@jest/globals"

import tokenizer, { Token } from "./tokenizer.js"

describe("tokenizer", () => {
    test("OK", () => {
        expect(tokenizer("sentence one-of-a-kind. Truly    AWESOME!!")).toEqual([
            {
                group: "chars",
                value: "sentence",
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

    test("Empty", () => {
        expect(tokenizer("")).toEqual([])
    })

    test("Whitespace", () => {
        expect(tokenizer(" ")).toEqual([
            {
                group: "whitespace",
                value: " ",
            },
        ])
    })
})

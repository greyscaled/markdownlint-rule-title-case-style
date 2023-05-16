import tokenizer, { Token } from "./tokenizer"

describe("tokenizer", () => {
    test.each<[string, string[], Token[]]>([
        // Whitespace and empty cases
        ["", [], []],
        [
            "    ",
            [],
            [
                {
                    columnStart: 1,
                    columnEnd: 4,
                    isIgnoredWord: false,
                    type: "whitespace",
                    value: "    ",
                },
            ],
        ],
        // Words
        [
            "Hello world",
            [],
            [
                {
                    columnStart: 1,
                    columnEnd: 5,
                    isIgnoredWord: false,
                    type: "other",
                    value: "Hello",
                },
                {
                    columnStart: 6,
                    columnEnd: 6,
                    isIgnoredWord: false,
                    type: "whitespace",
                    value: " ",
                },
                {
                    columnStart: 7,
                    columnEnd: 11,
                    isIgnoredWord: false,
                    type: "other",
                    value: "world",
                },
            ],
        ],
        // Ignored
        [
            "Check out these SQL commands",
            ["SQL"],
            [
                {
                    columnStart: 1,
                    columnEnd: 5,
                    isIgnoredWord: false,
                    type: "other",
                    value: "Check",
                },
                {
                    columnStart: 6,
                    columnEnd: 6,
                    isIgnoredWord: false,
                    type: "whitespace",
                    value: " ",
                },
                {
                    columnStart: 7,
                    columnEnd: 9,
                    isIgnoredWord: false,
                    type: "other",
                    value: "out",
                },
                {
                    columnStart: 10,
                    columnEnd: 10,
                    isIgnoredWord: false,
                    type: "whitespace",
                    value: " ",
                },
                {
                    columnStart: 11,
                    columnEnd: 15,
                    isIgnoredWord: false,
                    type: "other",
                    value: "these",
                },
                {
                    columnStart: 16,
                    columnEnd: 16,
                    isIgnoredWord: false,
                    type: "whitespace",
                    value: " ",
                },
                {
                    columnStart: 17,
                    columnEnd: 19,
                    isIgnoredWord: true,
                    type: "other",
                    value: "SQL",
                },
                {
                    columnStart: 20,
                    columnEnd: 20,
                    isIgnoredWord: false,
                    type: "whitespace",
                    value: " ",
                },
                {
                    columnStart: 21,
                    columnEnd: 28,
                    isIgnoredWord: false,
                    type: "other",
                    value: "commands",
                },
            ],
        ],
        // Numbers
        [
            "1. hello",
            [],
            [
                {
                    columnStart: 1,
                    columnEnd: 1,
                    isIgnoredWord: false,
                    type: "number",
                    value: "1",
                },
                {
                    columnStart: 2,
                    columnEnd: 2,
                    isIgnoredWord: false,
                    type: "punctuation",
                    value: ".",
                },
                {
                    columnStart: 3,
                    columnEnd: 3,
                    isIgnoredWord: false,
                    type: "whitespace",
                    value: " ",
                },
                {
                    columnStart: 4,
                    columnEnd: 8,
                    isIgnoredWord: false,
                    type: "other",
                    value: "hello",
                },
            ],
        ],

        // Punctuation
        [
            "one,two,three!",
            [],
            [
                {
                    columnStart: 1,
                    columnEnd: 3,
                    isIgnoredWord: false,
                    type: "other",
                    value: "one",
                },
                {
                    columnStart: 4,
                    columnEnd: 4,
                    isIgnoredWord: false,
                    type: "punctuation",
                    value: ",",
                },
                {
                    columnStart: 5,
                    columnEnd: 7,
                    isIgnoredWord: false,
                    type: "other",
                    value: "two",
                },
                {
                    columnStart: 8,
                    columnEnd: 8,
                    isIgnoredWord: false,
                    type: "punctuation",
                    value: ",",
                },
                {
                    columnStart: 9,
                    columnEnd: 13,
                    isIgnoredWord: false,
                    type: "other",
                    value: "three",
                },
                {
                    columnStart: 14,
                    columnEnd: 14,
                    isIgnoredWord: false,
                    type: "punctuation",
                    value: "!",
                },
            ],
        ],
    ])(`tokenizer(%p, %p)`, (str, ignoredWords, tokens) => {
        expect(tokenizer(str, ignoredWords)).toEqual(tokens)
    })
})

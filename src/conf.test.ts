import { describe, expect, test } from "@jest/globals"

import { RuleConfig, defaultRuleConfig, parse } from "./conf.js"
import TitleCaseStyleError from "./error.js"

describe("parse", () => {
    test("Default", () => {
        const testCases = [false, 0, "", null, undefined]
        for (const tc of testCases) {
            expect(parse(tc)).toEqual(defaultRuleConfig)
        }
    })

    test.each<[string, unknown, RuleConfig]>([
        ["Empty", {}, defaultRuleConfig],
        ["Sentence", { case: "sentence" }, { case: "sentence", ignore: [] }],
        ["Title", { case: "title" }, { case: "title", ignore: [] }],
        [
            "Ignore",
            { ignore: ["test", "test-test"] },
            { case: "sentence", ignore: ["test", "test-test"] },
        ],
        [
            "SentenceIgnore",
            { case: "sentence", ignore: ["test"] },
            { case: "sentence", ignore: ["test"] },
        ],
        ["TitleIgnore", { case: "title", ignore: ["Test"] }, { case: "title", ignore: ["Test"] }],
    ])("ParseConfig%s", (_, config, parsed) => {
        expect(parse(config)).toEqual(parsed)
    })

    test("ErrorCaseType", () => {
        expect.assertions(1)
        try {
            parse({ case: 3 })
        } catch (err) {
            expect((err as TitleCaseStyleError).message).toBe(
                `title-case-style: config: case: expected 'string', got 'number'`,
            )
        }
    })

    test("ErrorUnknownCase", () => {
        expect.assertions(1)
        try {
            parse({ case: "snake_case" })
        } catch (err) {
            expect((err as TitleCaseStyleError).message).toBe(
                `title-case-style: config: case: expected ['sentence', 'title'], got 'snake_case'`,
            )
        }
    })

    test("ErrorIgnoreNotArray", () => {
        expect.assertions(1)
        try {
            parse({ ignore: "test" })
        } catch (err) {
            expect((err as TitleCaseStyleError).message).toBe(
                `title-case-style: config: ignore: expected 'array', got 'string'`,
            )
        }
    })

    test("ErrorIgnoreNotStringArray", () => {
        expect.assertions(1)
        try {
            parse({ ignore: [1] })
        } catch (err) {
            expect((err as TitleCaseStyleError).message).toBe(
                `title-case-style: config: ignore: ignore must be of type string[]`,
            )
        }
    })
})

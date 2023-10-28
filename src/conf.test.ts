import { describe, expect, test } from "@jest/globals"

import parseConfig, { RuleConfig, defaultRuleConfig } from "./conf.js"
import TitleCaseStyleError from "./error.js"

describe("parse", () => {
    test("Default", () => {
        const testCases = [false, 0, "", null, undefined]
        for (const tc of testCases) {
            expect(parseConfig(tc)).toEqual(defaultRuleConfig)
        }
    })

    test.each<[string, unknown, RuleConfig]>([
        ["Empty", {}, defaultRuleConfig],
        ["Sentence", { case: "sentence" }, { case: "sentence" }],
        ["Title", { case: "title" }, { case: "title" }],
    ])("ParseConfig%s", (_, config, parsed) => {
        expect(parseConfig(config)).toEqual(parsed)
    })

    test("ErrorCaseType", () => {
        expect.assertions(1)
        try {
            parseConfig({ case: 3 })
        } catch (err) {
            expect((err as TitleCaseStyleError).message).toBe(
                `title-case-style: config: case: expected 'string', got 'number'`,
            )
        }
    })

    test("ErrorUnknownCase", () => {
        expect.assertions(1)
        try {
            parseConfig({ case: "snake_case" })
        } catch (err) {
            expect((err as TitleCaseStyleError).message).toBe(
                `title-case-style: config: case: expected ['sentence', 'title'], got 'snake_case'`,
            )
        }
    })
})

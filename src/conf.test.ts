import { describe, expect, test } from "@jest/globals"

import { RuleConfig, defaultRuleConfig, parse } from "./conf.js"

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
        ["Ignore", { ignore: ["test"] }, { case: "sentence", ignore: ["test"] }],
        [
            "SentenceIgnore",
            { case: "sentence", ignore: ["test"] },
            { case: "sentence", ignore: ["test"] },
        ],
        ["TitleIgnore", { case: "title", ignore: ["Test"] }, { case: "title", ignore: ["Test"] }],
    ])("ParseConfig%s", (_, config, parsed) => {
        expect(parse(config)).toEqual(parsed)
    })
})

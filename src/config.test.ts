import { describe, expect, test } from "@jest/globals"

import parse, { RuleConfig, defaultRuleConfig } from "./config.js"

describe("config::parse", () => {
    test.each([[false], [0], [""], [null], [undefined]])("Default", (tc) => {
        expect(parse(tc)).toEqual(defaultRuleConfig)
    })

    test.each<[unknown, RuleConfig]>([
        [{}, defaultRuleConfig],
        [{ case: "sentence" }, { case: "sentence", ignore: [] }],
        [{ case: "title" }, { case: "title", ignore: [] }],
        [{ ignore: ["test"] }, { case: "sentence", ignore: ["test"] }],
        [
            { case: "title", ignore: ["Test"] },
            { case: "title", ignore: ["Test"] },
        ],
    ])("ParseConfig", (tc, parsed) => {
        expect(parse(tc)).toEqual(parsed)
    })
})

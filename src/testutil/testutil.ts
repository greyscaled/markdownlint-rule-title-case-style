import { expect } from "@jest/globals"
import markdownlint, { MarkdownItToken, Rule, RuleParams } from "markdownlint"

import filterHeadings from "../filter_headings.js"

export const generateTokens = (md: string): MarkdownItToken[] => {
    const result: MarkdownItToken[] = []

    const rule: Rule = {
        description: "generate tokens for test",
        function: (params: RuleParams): void => {
            result.push(...params.tokens)
        },
        names: ["token-gen"],
        tags: ["headers", "headings"],
    }

    markdownlint.sync({
        customRules: [rule],
        strings: { md: md },
    })

    return result
}

export const requireToken = (md: string): MarkdownItToken => {
    const tokens = generateTokens(md)
    const headings = filterHeadings(tokens)
    expect(headings.length).toBe(1)
    return headings[0]
}

import { expect } from "@jest/globals"
import markdownlint, { FixInfo, LintError, MarkdownItToken, Rule, RuleParams } from "markdownlint"

import { RuleConfig } from "./conf.js"
import filterHeadings from "./filter_headings.js"
import rule from "./rule.js"

// This is ripped from `applyFix` in markdownlint helpers
// https://github.com/DavidAnson/markdownlint/blob/main/helpers/helpers.js#L993
export const fixLine = (line: string, fixInfo: FixInfo): null | string => {
    const editColumn = fixInfo.editColumn || 1
    const deleteCount = fixInfo.deleteCount || 0
    const insertText = fixInfo.insertText || ""
    const editIndex = editColumn - 1

    if (deleteCount < 0) {
        return null
    }

    return (
        line.slice(0, editIndex) +
        insertText.replace(/\n/g, "\n") +
        line.slice(editIndex + deleteCount)
    )
}

export const lint = (testCase: string, conf: RuleConfig): { testCase: LintError[] } => {
    const result = markdownlint.sync({
        config: {
            "title-case-style": {
                ...conf,
            },
        },
        customRules: [rule],
        strings: { testCase: testCase },
    })
    return result as { testCase: LintError[] }
}

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

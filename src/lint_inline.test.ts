import { describe, expect, test } from "@jest/globals"

import TitleCaseStyleError from "./error.js"
import filterHeadings from "./filter_headings.js"
import lintInline, { Violation } from "./lint_inline.js"
import { generateTokens } from "./test_util.js"

describe("lintInline", () => {
    test("NoViolation", () => {
        const headings = filterHeadings(generateTokens("# Hello world\n"))
        expect(lintInline(headings[0], { case: "sentence", ignore: [] })).toEqual([])
    })

    test("Violation", () => {
        const headings = filterHeadings(generateTokens("# Hello World\n"))
        expect(lintInline(headings[0], { case: "sentence", ignore: [] })).toEqual([
            {
                detail: "Expected: 'Hello world'; Actual: 'Hello World'",
                fixInfo: {
                    deleteCount: "Hello World".length,
                    editColumn: 3,
                    insertText: "Hello world",
                    lineNumber: 1,
                },
                lineNumber: 1,
            } as Violation,
        ])
    })

    test("MultipleViolations", () => {
        const headings = filterHeadings(generateTokens("# Hello Friends `code` and Family\n"))
        expect(lintInline(headings[0], { case: "sentence", ignore: [] })).toEqual([
            {
                detail: "Expected: 'Hello friends '; Actual: 'Hello Friends '",
                fixInfo: {
                    deleteCount: "Hello Friends ".length,
                    editColumn: 3,
                    insertText: "Hello friends ",
                    lineNumber: 1,
                },
                lineNumber: 1,
            },
            {
                detail: "Expected: ' and family'; Actual: ' and Family'",
                fixInfo: {
                    deleteCount: " and Family".length,
                    editColumn: 3 + "Hello Friends `code`".length,
                    insertText: " and family",
                    lineNumber: 1,
                },
                lineNumber: 1,
            } as Violation,
        ] as Violation[])
    })

    test("EmptyHeading", () => {
        const headings = filterHeadings(generateTokens("#"))
        expect(lintInline(headings[0], { case: "sentence", ignore: [] })).toEqual([])
    })

    test("ErrorNotInline", () => {
        expect.assertions(1)
        const tokens = generateTokens("`code`\n")
        try {
            lintInline(tokens[0], { case: "sentence", ignore: [] })
        } catch (err) {
            expect((err as TitleCaseStyleError).message).toBe(
                `title-case-style: lint: invalid token: expected 'inline', got 'paragraph_open': this may be an error with title-case-style; file a bug report: https://github.com/greyscaled/markdownlint-rule-title-case-style/issues`,
            )
        }
    })
})

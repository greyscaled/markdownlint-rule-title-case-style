import { describe, expect, test } from "@jest/globals"

import TitleCaseStyleError from "./error.js"

describe("TitleCaseStyleError", () => {
    test("Instanceof", () => {
        const err = new TitleCaseStyleError("")
        expect(err instanceof Error).toBe(true)
        expect(err instanceof TitleCaseStyleError).toBe(true)
    })

    test("NotInternal", () => {
        const err = new TitleCaseStyleError("test")
        expect(err.message).toBe("title-case-style: test")
    })

    test("Internal", () => {
        const err = new TitleCaseStyleError("test", true)
        expect(err.message).toBe(
            "title-case-style: test: this may be an error with title-case-style; file a bug report: https://github.com/greyscaled/markdownlint-rule-title-case-style/issues",
        )
    })
})

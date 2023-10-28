import { describe, expect, test } from "@jest/globals"

import { requireToken } from "./testutil/testutil.js"
import validateCase, { Violation } from "./validate_case.js"

describe("validate_case", () => {
    test.each<[string, string, Violation[]]>([
        ["Empty", "#", []],
        ["Hello", "# Hello", []],
    ])("%s", (_, md, violations) => {
        const token = requireToken(md)
        expect(validateCase(token)).toEqual(violations)
    })
})

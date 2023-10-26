import { describe, test } from "@jest/globals"
import stripLead from "./stripLead"

describe("stripLead", () => {
    test("NothingToStrip", () => {
        const testCase = "Hello World"
        const result = stripLead(testCase)
        expect(result.value).toBe(testCase)
        expect(result.stripped).toBe("")
    })

    test("StripsNumberedList", () => {
        const testCase = "1. Hello World"
        const result = stripLead(testCase)
        expect(result.value).toBe("Hello World")
        expect(result.stripped).toBe("1. ")
    })
})

import { describe, expect, test } from "@jest/globals"

import { mdSentenceCase, mdTitleCase } from "./test_data.js"
import { lint } from "./test_util.js"

describe("markdownlint-rule-title-case-style", () => {
    test("case-style: sentence", () => {
        const results = lint(mdSentenceCase, { case: "sentence" })
        expect(results.testCase).toHaveLength(0)
    })

    test("case-style: title", () => {
        const results = lint(mdTitleCase, { case: "title" })
        expect(results.testCase).toHaveLength(0)
    })
})

// describe("rule", () => {
//     test("SentenceCase", () => {
//         const results = lintLine(``, { case: "sentence" })
//         expect(results.line).toHaveLength(0)
//     })
//     test("SentenceCaseCatchTitleCase", () => {
//         const testCase = "# Hello World\n"
//         const results = lint(testCase)
//         expect(results.testCase).toHaveLength(1)
//         expect(results.testCase[0].errorDetail).toBe("Expected: Hello world; Actual: Hello World")
//     })

//     // Title case
//     test("TitleCase", () => {
//         const results = lint(testCaseTitleCase, { case: "title" })
//         expect(results.testCase).toHaveLength(0)
//     })
//     test("TitleCaseCatchSentenceCase", () => {
//         const testCase = "# Hello world\n"
//         const results = lint(testCase, { case: "title" })
//         expect(results.testCase).toHaveLength(1)
//         expect(results.testCase[0].errorDetail).toBe("Expected: Hello World; Actual: Hello world")
//     })

//     // Ignore
//     test("Ignore", () => {
//         const testCase = "# Check out SQL\n"
//         const results = lint(testCase, { ignore: ["SQL"] })
//         expect(results.testCase).toHaveLength(0)
//     })
//     test("IgnoreCatchesCase", () => {
//         const testCase = "# Check Out SQL\n"
//         const results = lint(testCase, { ignore: ["SQL"] })
//         expect(results.testCase).toHaveLength(1)
//         expect(results.testCase[0].errorDetail).toBe(
//             "Expected: Check out SQL; Actual: Check Out SQL",
//         )
//     })
//     test("IgnoreLastWordPunctuated", () => {
//         const testCase = `# What is SQL?\n`
//         const results = lint(testCase, { ignore: ["SQL"] })
//         expect(results.testCase).toHaveLength(0)
//     })
//     test("IgnoreWithCommas", () => {
//         const testCase = "# A, B, C and D\n"
//         const results = lint(testCase, { ignore: ["A", "B", "C", "D"] })
//         expect(results.testCase).toHaveLength(0)
//     })
//     test("IgnoreWithCommasCatchesCase", () => {
//         const testCase = "# A, B, C, D and E\n"
//         const results = lint(testCase, { ignore: ["A", "B"] })
//         expect(results.testCase).toHaveLength(1)
//         expect(results.testCase[0].errorDetail).toBe(
//             "Expected: A, B, c, d and e; Actual: A, B, C, D and E",
//         )
//     })
//     test("IgnoreLowercaseWordTitleCase", () => {
//         const testCase = "# Read company Blog\n"
//         const results = lint(testCase, { case: "title", ignore: ["company"] })
//         expect(results.testCase).toHaveLength(0)
//     })
//     test("IgnoreFirstWordSentenceCase", () => {
//         const testCase = "# company blog is really fun to read\n"
//         const results = lint(testCase, { case: "sentence", ignore: ["company"] })
//         expect(results.testCase).toHaveLength(0)
//     })
//     test("IgnoreFirstWordTitleCase", () => {
//         const testCase = "# company Blog Is Really Fun to Read\n"
//         const results = lint(testCase, { case: "title", ignore: ["company"] })
//         expect(results.testCase).toHaveLength(0)
//     })

//     // Reporting
//     test("ErrorReportWithNumberedList", () => {
//         const testCase = "# 1. Some List\n"
//         const results = lint(testCase)
//         expect(results.testCase).toHaveLength(1)
//         expect(results.testCase[0].errorDetail).toBe("Expected: 1. Some list; Actual: 1. Some List")
//     })
//     test("ErrorReportWithCommas", () => {
//         const testCase = "# Hello, World and Goodbye, Cruel World\n"
//         const results = lint(testCase)
//         expect(results.testCase).toHaveLength(1)
//         expect(results.testCase[0].errorDetail).toBe(
//             "Expected: Hello, world and goodbye, cruel world; Actual: Hello, World and Goodbye, Cruel World",
//         )
//     })
//     test("ErrorReportWithPunctuation", () => {
//         const testCase = "# Hello World!\n"
//         const results = markdownlint.sync({
//             config: {
//                 MD026: false,
//             },
//             customRules: [rule],
//             strings: { testCase: testCase },
//         })
//         expect(results.testCase).toHaveLength(1)
//         expect(results.testCase[0].errorDetail).toBe("Expected: Hello world!; Actual: Hello World!")
//     })
//     test("ErrorReportWithFirstIgnoredSentenceCase", () => {
//         const testCase = "# company Blog is Great\n"
//         const results = markdownlint.sync({
//             config: {
//                 "title-case-style": {
//                     case: "sentence",
//                     ignore: ["company"],
//                 },
//             },
//             customRules: [rule],
//             strings: { testCase: testCase },
//         })
//         expect(results.testCase).toHaveLength(1)
//         expect(results.testCase[0].errorDetail).toBe(
//             "Expected: company blog is great; Actual: company Blog is Great",
//         )
//     })
//     test("ErrorReportWithFirstIgnoredTitleCase", () => {
//         const testCase = "# company blog is Great\n"
//         const results = markdownlint.sync({
//             config: {
//                 "title-case-style": {
//                     case: "title",
//                     ignore: ["company"],
//                 },
//             },
//             customRules: [rule],
//             strings: { testCase: testCase },
//         })
//         expect(results.testCase).toHaveLength(1)
//         expect(results.testCase[0].errorDetail).toBe(
//             "Expected: company Blog Is Great; Actual: company blog is Great",
//         )
//     })

//     // Autofix
//     test("AutoFixSentenceCase", () => {
//         // Given: title case
//         const testCase = "# Hello World\n"

//         // When: lint for sentence case
//         const before = lint(testCase, { case: "sentence" })
//         expect(before.testCase).toHaveLength(1)

//         // Then: fixInfo should be sentence case
//         const { fixInfo } = before.testCase[0]
//         expect(fixInfo).toBeDefined()
//         expect(fixInfo?.insertText).toBe("Hello world")

//         if (!fixInfo) {
//             throw new Error("fixInfo is null")
//         }

//         // When: the string is fixed
//         const testCaseFixed = fix(testCase, fixInfo)
//         expect(testCaseFixed).toBe("# Hello world\n")

//         if (!testCaseFixed) {
//             throw new Error("testCaseFixed is null or empty")
//         }

//         // When: lint the fixed string
//         const after = lint(testCaseFixed, { case: "sentence" })

//         // Then: there are no errors
//         expect(after.testCase).toHaveLength(0)
//     })

//     // Code block
//     test("CodeBlockSentenceCase", () => {
//         const testCase = "# `toString()` method\n"
//         const results = lint(testCase, { case: "sentence" })
//         expect(results.testCase).toHaveLength(0)
//     })
//     test("CodeBlockTitleCase", () => {
//         const testCase = "# `toString()` Method\n"
//         const results = lint(testCase, { case: "title" })
//         expect(results.testCase).toHaveLength(0)
//     })
// })

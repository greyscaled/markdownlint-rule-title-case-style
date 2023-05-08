import markdownlint from "markdownlint"
import rule from "./rule"

const testCaseSentenceCase = `# Hello world

some content

## Standards

### 1. SQL standards

### 2. PostgreSQL-SQL standards

### 11. Eleven

#### 44. Fourty four, thirty three

## Have questions?
`

const testCaseTitleCase = `# Hello World

some content

## Standards

### 1. SQL Standards

### 2. PostgreSQL-SQL Standards

### 11. Eleven

#### 44. Fourty Four, Thirty Three

## Have Questions?
`

interface Options {
    case?: "sentence" | "title"
    ignore?: string[]
}

const lint = (testCase: string, options: Options = {}): markdownlint.LintResults => {
    return markdownlint.sync({
        customRules: [rule],
        config: {
            "title-case-style": {
                ...options,
            },
        },
        strings: { testCase: testCase },
    })
}

// This is ripped from `applyFix` in markdownlint helpers
// https://github.com/DavidAnson/markdownlint/blob/main/helpers/helpers.js#L993
const fix = (line: string, fixInfo: markdownlint.FixInfo): string | null => {
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

describe("markdownlint-rule-title-case-style", () => {
    // Sentence case
    test("SentenceCase", () => {
        const results = lint(testCaseSentenceCase)
        expect(results.testCase).toHaveLength(0)
    })
    test("SentenceCaseCatchTitleCase", () => {
        const testCase = "# Hello World\n"
        const results = lint(testCase)
        expect(results.testCase).toHaveLength(1)
        expect(results.testCase[0].errorDetail).toBe("Expected: Hello world; Actual: Hello World")
    })

    // Title case
    test("TitleCase", () => {
        const results = lint(testCaseTitleCase, { case: "title" })
        expect(results.testCase).toHaveLength(0)
    })
    test("TitleCaseCatchSentenceCase", () => {
        const testCase = "# Hello world\n"
        const results = lint(testCase, { case: "title" })
        expect(results.testCase).toHaveLength(1)
        expect(results.testCase[0].errorDetail).toBe("Expected: Hello World; Actual: Hello world")
    })

    // Ignore
    test("Ignore", () => {
        const testCase = "# Check out SQL\n"
        const results = lint(testCase, { ignore: ["SQL"] })
        expect(results.testCase).toHaveLength(0)
    })
    test("IgnoreCatchesCase", () => {
        const testCase = "# Check Out SQL\n"
        const results = lint(testCase, { ignore: ["SQL"] })
        expect(results.testCase).toHaveLength(1)
        expect(results.testCase[0].errorDetail).toBe(
            "Expected: Check out SQL; Actual: Check Out SQL"
        )
    })
    test("IgnoreLastWordPunctuated", () => {
        const testCase = `# What is SQL?\n`
        const results = lint(testCase, { ignore: ["SQL"] })
        expect(results.testCase).toHaveLength(0)
    })
    test("IgnoreWithCommas", () => {
        const testCase = "# A, B, C and D\n"
        const results = lint(testCase, { ignore: ["A", "B", "C", "D"] })
        expect(results.testCase).toHaveLength(0)
    })
    test("IgnoreWithCommasCatchesCase", () => {
        const testCase = "# A, B, C, D and E\n"
        const results = lint(testCase, { ignore: ["A", "B"] })
        expect(results.testCase).toHaveLength(1)
        expect(results.testCase[0].errorDetail).toBe(
            "Expected: A, B, c, d and e; Actual: A, B, C, D and E"
        )
    })

    // Reporting
    test("ErrorReportWithNumberedList", () => {
        const testCase = "# 1. Some List\n"
        const results = lint(testCase)
        expect(results.testCase).toHaveLength(1)
        expect(results.testCase[0].errorDetail).toBe("Expected: 1. Some list; Actual: 1. Some List")
    })
    test("ErrorReportWithCommas", () => {
        const testCase = "# Hello, World and Goodbye, Cruel World\n"
        const results = lint(testCase)
        expect(results.testCase).toHaveLength(1)
        expect(results.testCase[0].errorDetail).toBe(
            "Expected: Hello, world and goodbye, cruel world; Actual: Hello, World and Goodbye, Cruel World"
        )
    })
    test("ErrorReportWithPunctuation", () => {
        const testCase = "# Hello World!\n"
        const results = markdownlint.sync({
            customRules: [rule],
            config: {
                MD026: false,
            },
            strings: { testCase: testCase },
        })
        expect(results.testCase).toHaveLength(1)
        expect(results.testCase[0].errorDetail).toBe("Expected: Hello world!; Actual: Hello World!")
    })

    // Autofix
    test("AutoFixSentenceCase", () => {
        // Given: title case
        const testCase = "# Hello World\n"

        // When: lint for sentence case
        const before = lint(testCase, { case: "sentence" })
        expect(before.testCase).toHaveLength(1)

        // Then: fixInfo should be sentence case
        const { fixInfo } = before.testCase[0]
        expect(fixInfo).toBeDefined()
        expect(fixInfo?.insertText).toBe("Hello world")

        if (!fixInfo) {
            throw new Error("fixInfo is null")
        }

        // When: the string is fixed
        const testCaseFixed = fix(testCase, fixInfo)
        expect(testCaseFixed).toBe("# Hello world\n")

        if (!testCaseFixed) {
            throw new Error("testCaseFixed is null or empty")
        }

        // When: lint the fixed string
        const after = lint(testCaseFixed, { case: "sentence" })

        // Then: there are no errors
        expect(after.testCase).toHaveLength(0)
    })
})

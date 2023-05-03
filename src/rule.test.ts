import markdownlint from "markdownlint"
import rule from "./rule"

const testCaseSentenceCase = `# Hello world

some content

## Standards

### 1. SQL standards

### 2. PostgreSQL-SQL standards
`

const testCaseTitleCase = `# Hello World

some content

## Standards

### 1. SQL Standards

### 2. PostgreSQL-SQL Standards
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

    // Reporting
    test("ErrorReportWithNumberedList", () => {
        const testCase = "# 1. Some List\n"
        const results = lint(testCase)
        expect(results.testCase).toHaveLength(1)
        expect(results.testCase[0].errorDetail).toBe("Expected: 1. Some list; Actual: 1. Some List")
    })
})

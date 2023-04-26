import markdownlint from "markdownlint"
import rule from "./rule"

describe("rule", () => {
    test("Ok", () => {
        const testCase = `# Hello world

## Lorum ipsum

### Something something something

#### CAPS-Caps lowercase lowercase
`
        const results = markdownlint.sync({
            customRules: [rule],
            strings: { testCase },
        })
        expect(results.testCase).toHaveLength(0)
    })

    test("CatchTitleCase", () => {
        const testCase = `# Hello World\n`
        const results = markdownlint.sync({
            customRules: [rule],
            strings: { testCase },
        })
        expect(results.testCase).toHaveLength(1)
        expect(results.testCase[0].errorDetail).toBe("Expected: Hello world; Actual: Hello World")
    })
})

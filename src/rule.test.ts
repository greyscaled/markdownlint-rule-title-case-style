import markdownlint from "markdownlint"
import rule from "./rule"

describe("rule", () => {
    describe("Defaults", () => {
        test("Ok", () => {
            const testCase = `# Hello world\n`
            const results = markdownlint.sync({
                customRules: [rule],
                strings: { testCase },
            })
            expect(results.testCase).toHaveLength(0)
        })
    })

    describe("Sentence case", () => {
        test("Ok", () => {
            const testCase = `# Hello world

## Lorum ipsum

### Something something something

#### CAPS-Caps lowercase lowercase
`
            const results = markdownlint.sync({
                customRules: [rule],
                config: {
                    "title-case-style": {
                        case: "sentence",
                    },
                },
                strings: { testCase },
            })
            expect(results.testCase).toHaveLength(0)
        })

        test("CatchTitleCase", () => {
            const testCase = `# Hello World\n`
            const results = markdownlint.sync({
                customRules: [rule],
                config: {
                    "title-case-style": {
                        case: "sentence",
                    },
                },
                strings: { testCase },
            })
            expect(results.testCase).toHaveLength(1)
            expect(results.testCase[0].errorDetail).toBe(
                "Expected: Hello world; Actual: Hello World"
            )
        })
    })

    describe("Title case", () => {
        test("Ok", () => {
            const testCase = `# Hello World

## Lorum Ipsum

### Something Something Something

#### CAPS-Caps Uppercase Uppercase
`
            const results = markdownlint.sync({
                customRules: [rule],
                config: {
                    "title-case-style": {
                        case: "title",
                    },
                },
                strings: { testCase },
            })
            expect(results.testCase).toHaveLength(0)
        })

        test("CatchSentenceCase", () => {
            const testCase = `# Hello world\n`
            const results = markdownlint.sync({
                customRules: [rule],
                config: {
                    "title-case-style": {
                        case: "title",
                    },
                },
                strings: { testCase },
            })
            expect(results.testCase).toHaveLength(1)
            expect(results.testCase[0].errorDetail).toBe(
                "Expected: Hello World; Actual: Hello world"
            )
        })
    })
})

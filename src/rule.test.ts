import { describe, expect, test } from "@jest/globals"
import { FixInfo } from "markdownlint"

import { fixLine, lint } from "./test_util.js"

// prettier-ignore
const mdSentenceCase = 
`# API documentation

Eiusmod sit occaecat in elit duis consequat laboris consectetur. Ullamco eu
tempor ea tempor sit. Commodo qui cillum labore minim mollit voluptate eiusmod.
Est dolore anim anim fugiat. Voluptate laborum exercitation duis deserunt do est
commodo nostrud consequat sint est in. Consequat est consectetur fugiat eiusmod
irure anim reprehenderit consectetur nostrud labore.

## Methods (in alphabetical order)

### \`sort()\` [ref-1]

### \`toString()\` something something something

## Did we tell you that we love SQL? And JavaScript?

### \`SELECT\`

### INSERT INTO

## **Special** thanks to "Our Friends and Family" (:D)

[ref-1]: /ref-1
`

// prettier-ignore
const mdTitleCase = 
`# API Documentation

Eiusmod sit occaecat in elit duis consequat laboris consectetur. Ullamco eu
tempor ea tempor sit. Commodo qui cillum labore minim mollit voluptate eiusmod.
Est dolore anim anim fugiat. Voluptate laborum exercitation duis deserunt do est
commodo nostrud consequat sint est in. Consequat est consectetur fugiat eiusmod
irure anim reprehenderit consectetur nostrud labore.

## Methods (in Alphabetical Order)

### \`sort()\` [ref-1]

### \`toString()\` Something as Something Else

## Did We Tell You That We Love SQL? And JavaScript?

### \`SELECT\`

### INSERT INTO

## **Special** Thanks to "Our Friends and Family" (:D)

[ref-1]: /ref-1
`

describe("markdownlint-rule-title-case-style", () => {
    test("SentenceCase", () => {
        const results = lint(mdSentenceCase, { case: "sentence", ignore: ["JavaScript"] })
        expect(results.testCase).toHaveLength(0)
    })

    test("TitleCase", () => {
        const results = lint(mdTitleCase, { case: "title", ignore: ["JavaScript"] })
        expect(results.testCase).toHaveLength(0)
    })

    test("ReportErrors", () => {
        const testCases: Array<[string, string]> = [
            ["# Hello World\n", "Expected: 'Hello world'; Actual: 'Hello World'"],
            ["# [link](http://test.com) Hello\n", "Expected: ' hello'; Actual: ' Hello'"],
            ["# `INSERT` SQL Method\n", "Expected: ' SQL method'; Actual: ' SQL Method'"],
        ]

        for (const tc of testCases) {
            const results = lint(tc[0], { case: "sentence" })
            expect(results.testCase[0].errorDetail).toBe(tc[1])
        }
    })

    test("Autofix", () => {
        const testCases: Array<[string, string]> = [
            ["# Hello World\n", "# Hello world\n"],
            ["# [link](http://test.com) Hello\n", "# [link](http://test.com) hello\n"],
            ["# `INSERT` SQL Method\n", "# `INSERT` SQL method\n"],
        ]

        for (const tc of testCases) {
            const results = lint(tc[0], { case: "sentence" })
            const { fixInfo } = results.testCase[0]
            expect(fixInfo).toBeDefined()

            const fixed = fixLine(tc[0], fixInfo as FixInfo)
            expect(fixed).toBe(tc[1])
            expect(lint(fixed as string, { case: "sentence" }).testCase).toHaveLength(0)
        }
    })
})

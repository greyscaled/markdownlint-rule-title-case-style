import { describe, expect, test } from "@jest/globals"
import markdownlint, { MarkdownItToken, Rule, RuleParams } from "markdownlint"

import filterHeadings from "./filter_headings.js"

// prettier-ignore
const md = `
# Hello world!!!

Est amet enim elit aute fugiat irure proident Lorem fugiat incididunt cillum.
Non veniam voluptate id quis mollit:

- Veniam incididunt eu aute voluptate amet
- Ullamco qui anim ut fugiat aliqua voluptate sunt nulla laborum fugiat

Go to: <https://google.com>

\`\`\`shell
echo "Hello world!!!"
\`\`\`

## Subheading with \`code\` (and parens)

1. Officia aute sit deserunt ut.
2. Ipsum occaecat mollit pariatur consectetur ut ex laborum ipsum occaecat exercitation Lorem.
3. Voluptate sint consequat aliquip anim deserunt aliqua voluptate duis ut occaecat.

### 1. one (1)

\`go mod tidy\`

### 2. two (2)

Non nisi cillum culpa laborum qui quis consectetur. Adipisicing nisi eu aliquip
aliquip laboris cupidatat voluptate minim sunt ea officia excepteur. Aliqua
dolore et voluptate qui ipsum deserunt sit proident deserunt cillum. Esse
excepteur adipisicing adipisicing irure occaecat proident consectetur dolor
commodo ex id pariatur enim. Qui anim non deserunt enim.

Check out [some other link]

## See also [some link](href)

[some other link]: href
`

const generateTokens = (md: string): MarkdownItToken[] => {
    const result: MarkdownItToken[] = []

    const rule: Rule = {
        description: "generate tokens for test",
        function: (params: RuleParams): void => {
            result.push(...params.tokens)
        },
        names: ["token-gen"],
        tags: ["headers", "headings"],
    }

    markdownlint.sync({
        customRules: [rule],
        strings: { md: md },
    })

    return result
}

describe("headings", () => {
    test("ExtractHeadings", () => {
        const tokens = generateTokens(md)
        const headings = filterHeadings(tokens)
        console.log(JSON.stringify(headings, null, 2))
        expect(headings.length).toBeLessThan(tokens.length)
        expect(headings.length).toBe(5)
        expect(headings).toEqual([
            expect.objectContaining({
                children: [
                    expect.objectContaining({
                        children: null,
                        content: "Hello world!!!",
                        type: "text",
                    }),
                ],
                content: "Hello world!!!",
                line: "# Hello world!!!",
                type: "inline",
            }),
            expect.objectContaining({
                children: [
                    expect.objectContaining({
                        children: null,
                        content: "Subheading with ",
                        type: "text",
                    }),
                    expect.objectContaining({
                        children: null,
                        content: "code",
                        type: "code_inline",
                    }),
                    expect.objectContaining({
                        children: null,
                        content: " (and parens)",
                        type: "text",
                    }),
                ],
                content: "Subheading with `code` (and parens)",
                line: "## Subheading with `code` (and parens)",
                type: "inline",
            }),
            expect.objectContaining({
                children: [
                    expect.objectContaining({
                        children: null,
                        content: "1. one (1)",
                        type: "text",
                    }),
                ],
                content: "1. one (1)",
                line: "### 1. one (1)",
                type: "inline",
            }),
            expect.objectContaining({
                children: [
                    expect.objectContaining({
                        children: null,
                        content: "2. two (2)",
                        type: "text",
                    }),
                ],
                content: "2. two (2)",
                line: "### 2. two (2)",
                type: "inline",
            }),
            expect.objectContaining({
                children: [
                    expect.objectContaining({
                        children: null,
                        content: "See also ",
                        type: "text",
                    }),
                    expect.objectContaining({
                        children: null,
                        content: "",
                        type: "link_open",
                    }),
                    expect.objectContaining({
                        children: null,
                        content: "some link",
                        type: "text",
                    }),
                    expect.objectContaining({
                        children: null,
                        content: "",
                        type: "link_close",
                    }),
                ],
                content: "See also [some link](href)",
                line: "## See also [some link](href)",
                type: "inline",
            }),
        ])
    })
})

import { MarkdownItToken, Rule, RuleOnError, RuleParams } from "markdownlint"
import { titleCase } from "title-case"

import parse, { RuleConfig } from "./config.js"
import sentenceCase from "./sentenceCase.js"
import stripIgnoredWords, { withIgnored } from "./stripIgnoredWords.js"
import stripLead from "./stripLead.js"
import stripPunctuation from "./stripPunctuation.js"

const rule: Rule = {
    description: "Enforces case style in titles",
    function: (params: RuleParams, onError: RuleOnError): void => {
        forEachHeading(params, (token) => {
            const strippedLead = stripLead(token.content)
            const strippedPunctuation = stripPunctuation(strippedLead.value)

            let config: RuleConfig
            try {
                config = parse(params.config)
            } catch (err) {
                throw new Error(`title-case-style: ${String(err)}`)
            }

            let withoutIgnoredWords = strippedPunctuation.value
            let ignoredIndicies: number[] = []
            let isFirstIgnored = false
            if (config.ignore) {
                const ignoredResult = stripIgnoredWords(withoutIgnoredWords, config.ignore)
                withoutIgnoredWords = ignoredResult.value
                ignoredIndicies = [...ignoredResult.ignoredIndicies]
                isFirstIgnored = ignoredResult.isFirstIgnored
            }

            let expected: string
            if (config.case === "sentence") {
                expected = sentenceCase(withoutIgnoredWords)
                if (isFirstIgnored) {
                    expected = strippedPunctuation.value[0] + expected.slice(1)
                }
            } else {
                expected = titleCase(withoutIgnoredWords)
                expected = strippedPunctuation.value[0] + expected.slice(1)
            }

            if (expected === withoutIgnoredWords) {
                return
            }

            const expectedInner = withIgnored(strippedLead.value, expected, ignoredIndicies)
            const expectedFull = `${strippedLead.stripped}${expectedInner}${strippedPunctuation.stripped}`

            onError({
                detail: `Expected: ${expectedFull}; Actual: ${token.content}`,
                fixInfo: {
                    // The token should be in the form of <heading> <content>,
                    // but technically there could be more leading whitespace.
                    // To try and make the fix work, we use the token.content
                    // to remove it from the leading <heading> (ie: '#')
                    deleteCount: token.content.length,
                    // editColumn is 1s based, hence the + 1
                    editColumn: token.line.indexOf(token.content) + 1,
                    insertText: expectedFull,
                    lineNumber: token.lineNumber,
                },
                lineNumber: token.lineNumber,
            })
        })
    },
    information: new URL(
        "https://github.com/greyscaled/markdownlint-rule-title-case-style/blob/main/docs/rules/title-case-style.md",
    ),
    names: ["title-case-style"],
    tags: ["headers", "headings"],
}
export default rule

const forEachHeading = (params: RuleParams, fn: (token: MarkdownItToken) => void): void => {
    let heading = null

    for (const token of params.tokens) {
        if (token.type === "heading_open") {
            heading = token
        } else if (token.type === "heading_close") {
            heading = null
        } else if (token.type === "inline" && heading) {
            fn(token)
        }
    }
}

import { MarkdownItToken, Rule, RuleOnError, RuleParams } from "markdownlint"
import stripIgnoredWords, { withIgnored } from "./stripIgnoredWords"
import sentenceCase from "./sentenceCase"
import { titleCase } from "title-case"

const CaseSentence = "sentence"
const CaseTitle = "title"

const rule: Rule = {
    names: ["title-case-style"],
    description: "Enforces case style in titles",
    information: new URL(
        "https://github.com/greyscaled/markdownlint-rule-title-case-style/blob/main/docs/rules/title-case-style.md"
    ),
    tags: ["headers", "headings"],
    function: (params: RuleParams, onError: RuleOnError): void => {
        forEachHeading(params, (token) => {
            let expected: string
            let parsedContent = token.content
            let ignoredIndicies: number[] = []

            if (params.config.ignore) {
                if (Array.isArray(params.config.ignore)) {
                    const stripped = stripIgnoredWords(token.content, params.config.ignore)
                    parsedContent = stripped.value
                    ignoredIndicies = [...stripped.ignoredIndicies]
                } else {
                    throw new Error(
                        `title-case-style: unrecognized config.ignore. Expected: an array of strings; Actual: ${params.config.ignore}`
                    )
                }
            }

            if (!params.config.case || params.config.case === CaseSentence) {
                expected = sentenceCase(parsedContent)
            } else if (params.config.case === CaseTitle) {
                expected = titleCase(parsedContent)
            } else {
                console.info(
                    `title-case-style: unrecognized config.case. Expected: "sentence","title"; Actual: ${params.config.case}. Defaulting to "sentence".`
                )
                expected = sentenceCase(parsedContent)
            }

            if (expected === parsedContent) {
                return
            }

            onError({
                detail: `Expected: ${withIgnored(
                    token.content,
                    expected,
                    ignoredIndicies
                )}; Actual: ${token.content}`,
                lineNumber: token.lineNumber,
            })
        })
    },
}
module.exports = rule
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

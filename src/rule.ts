import { MarkdownItToken, Rule, RuleOnError, RuleParams } from "markdownlint"
import { titleCase } from "title-case"
import sentenceCase from "./sentenceCase"
import stripIgnoredWords, { withIgnored } from "./stripIgnoredWords"
import stripLead from "./stripLead"

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
            const strippedLead = stripLead(token.content)
            let strippedContent = strippedLead.value
            let ignoredIndicies: number[] = []

            // Strip ending punctuation
            const endingPunctuation = strippedContent[strippedContent.length - 1]
            if ([".", "?", "!"].includes(endingPunctuation)) {
                strippedContent = strippedContent.slice(0, strippedContent.length - 1)
            }

            if (params.config.ignore) {
                if (Array.isArray(params.config.ignore)) {
                    const stripped = stripIgnoredWords(strippedContent, params.config.ignore)
                    strippedContent = stripped.value
                    ignoredIndicies = [...stripped.ignoredIndicies]
                } else {
                    throw new Error(
                        `title-case-style: unrecognized config.ignore. Expected: an array of strings; Actual: ${params.config.ignore}`
                    )
                }
            }

            let expected: string
            if (!params.config.case || params.config.case === CaseSentence) {
                expected = sentenceCase(strippedContent)
            } else if (params.config.case === CaseTitle) {
                expected = titleCase(strippedContent)
            } else {
                console.info(
                    `title-case-style: unrecognized config.case. Expected: "sentence","title"; Actual: ${params.config.case}. Defaulting to "sentence".`
                )
                expected = sentenceCase(strippedContent)
            }

            if (expected === strippedContent) {
                return
            }

            onError({
                detail: `Expected: ${strippedLead.stripped}${withIgnored(
                    strippedLead.value,
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

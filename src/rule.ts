import { MarkdownItToken, Rule, RuleOnError, RuleParams } from "markdownlint"
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

            if (params.config.case === "" || params.config.case === CaseSentence) {
                expected = sentenceCase(token.content)
            } else if (params.config.case === CaseTitle) {
                expected = titleCase(token.content)
            } else {
                console.info(
                    `title-case-style: unrecognized config.case. Expected: "sentence","title"; Actual: ${params.config.case}. Defaulting to "sentence".`
                )
                expected = sentenceCase(token.content)
            }

            if (expected === token.content) {
                return
            }

            onError({
                detail: `Expected: ${expected}; Actual: ${token.content}`,
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

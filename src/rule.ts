import { MarkdownItToken, Rule, RuleOnError, RuleParams } from "markdownlint"
import sentenceCase from "./sentenceCase"

const rule: Rule = {
    names: ["title-case-style"],
    description: "Enforces case style in titles",
    tags: ["headers", "headings"],
    function: (params: RuleParams, onError: RuleOnError): void => {
        forEachHeading(params, (token) => {
            const expected = sentenceCase(token.content)

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

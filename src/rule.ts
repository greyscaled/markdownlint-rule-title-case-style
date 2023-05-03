import { MarkdownItToken, Rule, RuleOnError, RuleParams } from "markdownlint"
import { titleCase } from "title-case"
import sentenceCase from "./sentenceCase"
import stripIgnoredWords, { withIgnored } from "./stripIgnoredWords"
import stripLead from "./stripLead"
import stripPunctuation from "./stripPunctuation"

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
            const strippedPunctuation = stripPunctuation(strippedLead.value)

            let withoutIgnoredWords = strippedPunctuation.value
            let ignoredIndicies: number[] = []
            if (params.config.ignore) {
                if (Array.isArray(params.config.ignore)) {
                    const ignoredResult = stripIgnoredWords(
                        withoutIgnoredWords,
                        params.config.ignore
                    )
                    withoutIgnoredWords = ignoredResult.value
                    ignoredIndicies = [...ignoredResult.ignoredIndicies]
                } else {
                    throw new Error(
                        `title-case-style: unrecognized config.ignore. Expected: an array of strings; Actual: ${params.config.ignore}`
                    )
                }
            }

            let expected: string
            if (!params.config.case || params.config.case === CaseSentence) {
                expected = sentenceCase(withoutIgnoredWords)
            } else if (params.config.case === CaseTitle) {
                expected = titleCase(withoutIgnoredWords)
            } else {
                console.info(
                    `title-case-style: unrecognized config.case. Expected: "sentence","title"; Actual: ${params.config.case}. Defaulting to "sentence".`
                )
                expected = sentenceCase(withoutIgnoredWords)
            }

            if (expected === withoutIgnoredWords) {
                return
            }

            onError({
                detail: `Expected: ${strippedLead.stripped}${withIgnored(
                    strippedLead.value,
                    expected,
                    ignoredIndicies
                )}${strippedPunctuation.stripped}; Actual: ${token.content}`,
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

import { Rule, RuleOnError, RuleParams } from "markdownlint"

import parseConfig from "./conf.js"
import filterHeadings from "./filter_headings.js"
import lintInline, { createTransformer } from "./lint_inline.js"

const rule: Rule = {
    description: "Enforces case style in titles",
    function: (params: RuleParams, onError: RuleOnError): void => {
        const config = parseConfig(params.config)
        const transformer = createTransformer(config.case)

        for (const heading of filterHeadings(params.tokens)) {
            const violations = lintInline(heading, transformer)

            for (const violation of violations) {
                onError({
                    detail: violation.detail,
                    fixInfo: violation.fixInfo,
                    lineNumber: violation.lineNumber,
                })
            }
        }
    },
    information: new URL(
        "https://github.com/greyscaled/markdownlint-rule-title-case-style/tree/main#usage",
    ),
    names: ["title-case-style"],
    tags: ["headers", "headings"],
}
export default rule
